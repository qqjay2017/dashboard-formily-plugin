import { cn } from "@/utils";
import { css } from "@emotion/css";
import { PropsWithChildren, forwardRef } from "react";

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
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      css`
        padding: 0 8px;
        align-items: center;
        font-weight: 600;
        font-size: var(--fs12);
        color: rgba(195, 212, 229, 0.6);
        line-height: var(--fs16);
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
));
TableCell.displayName = "TableCell";

const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      css`
        width: 25%;
        height: 25px;
        background: #10385c;
        padding-left: 8px;
        padding-top: 0;
        font-weight: 500;
        font-size: var(--fs12);
        color: rgba(195, 212, 229, 0.7);
        line-height: var(--fs16);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex: 0 1 auto;
      `,
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      css`
        overflow: hidden;
        height: 30px;
        background: transparent;
        display: grid;
        position: sticky;
        top: 0px;
        z-index: 98;
        background-color: #012b52;
        width: 100%;
        border: none;
        border-bottom: 1px solid #10385c;
      `,
      className
    )}
    {...props}
  />
));
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
