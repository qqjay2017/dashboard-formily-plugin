import { css } from "@emotion/css";
import type { PropsWithChildren } from "react";
import { forwardRef } from "react";
import { useToken } from "@/schema-component/antd/style";

import { cn } from "@/utils";

interface TableContainerProps extends PropsWithChildren {}

const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className={css`
          position: relative;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
        `}
      >
        {children}
      </div>
    );
  }
);

TableContainer.displayName = "TableContainer";

const Table = forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, style, children, ...props }, ref) => {
  return (
    <table
      ref={ref}
      className={cn(
        css`
          width: 100%;
          caption-side: bottom;
          border-collapse: collapse;
          border-spacing: 0;
          table-layout: fixed;
        `,
        className
      )}
      style={{
        ...style,
      }}
      {...props}
    >
      {children}
    </table>
  );
});
Table.displayName = "Table";

const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      css`
        padding-top: 3px;
      `,
      className
    )}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const { token } = useToken();
  return (
    <td
      ref={ref}
      className={cn(
        css`
          padding: 0 0.08rem;
          align-items: center;
          font-weight: 600;
          font-size: 0.12rem;
          color: ${token.table.colorRowForeground};
          line-height: 0.16rem;
          max-width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          span {
            max-width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        `,
        className
      )}
      {...props}
    />
  );
});
TableCell.displayName = "TableCell";

const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const { token } = useToken();
  return (
    <th
      ref={ref}
      className={cn(
        css`
          width: 25%;
          height: 0.25rem;
          background-color: ${token.table.colorHeaderBg};
          padding-left: 0.08rem;
          padding-top: 0;
          font-weight: 500;
          font-size: 0.12rem;
          color: ${token.table.colorHeaderForeground};
          line-height: 0.16rem;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex: 0 1 auto;
        `,
        className
      )}
      {...props}
    />
  );
});
TableHead.displayName = "TableHead";

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const { token } = useToken();
  return (
    <thead
      ref={ref}
      className={cn(
        css`
          overflow: hidden;
          height: 0.3rem;
          background: transparent;
          display: grid;
          position: sticky;
          top: 0;
          z-index: 98;
          /* background-color: #012b52; */
          width: 100%;
          border: none;
          border-bottom: 1px solid ${token.table.colorRowBg};
        `,
        className
      )}
      {...props}
    />
  );
});
TableHeader.displayName = "TableHeader";

const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      css`
        width: 100%;
        display: flex;
        height: 100%;
      `,

      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

export {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
};
