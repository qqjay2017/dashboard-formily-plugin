import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

import useResizeObserver from "use-resize-observer";

export function DataTable<TData, TValue>({
  columns = [],
  data,
}: DataTableProps<TData, TValue>) {
  const { ref: tableContainerRef, width: tableContainerWidth = 0 } =
    useResizeObserver();

  const hasSize = columns.reduce((memo, cur) => {
    return memo + cur.size || 0;
  }, 0);

  const hasSizeCoumnsCount = columns.filter((c) => c.size).length;
  const noSizeColumnCount = columns.length - hasSizeCoumnsCount;

  const table = useReactTable({
    data,
    columns: columns.map((c) => {
      return {
        ...c,
        size: c.size || (tableContainerWidth - hasSize) / noSizeColumnCount,
      };
    }),
    getCoreRowModel: getCoreRowModel(),
    initialState: {},
    defaultColumn: {
      size: 0,
      minSize: 0,
    },
  });

  return (
    <TableContainer ref={tableContainerRef}>
      <Table
        style={{
          width: tableContainerWidth,
        }}
      >
        <TableHeader>
          <TableRow>
            {table.getFlatHeaders().map((header) => {
              return (
                <TableHead
                  colSpan={header.colSpan}
                  key={header.id}
                  style={{
                    width: header.column.columnDef.size
                      ? header.getSize()
                      : undefined,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                style={{
                  background: index % 2 ? "#093157" : "#012B52",
                  height: "0.36rem",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      height: "0.36rem",
                      lineHeight: "0.36rem",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                暂无数据
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
