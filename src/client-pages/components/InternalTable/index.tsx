import { css, cx } from "@emotion/css";
import type { TableProps } from "antd";
import { Table } from "antd";
import { tableDefaultProps } from "@/utils";

interface IInternalTableProps extends TableProps {
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

/**
 * 通用table封装
 * @param param0
 * @returns
 */

export default function InternalTable({
  containerProps,
  ...props
}: IInternalTableProps) {
  return (
    <div
      {...containerProps}
      className={cx(
        containerProps?.className,
        css`
          padding: 24px 24px 16px 24px;
          background-color: #fff;
          border-radius: 2px;
          /* border: 1px solid #f0f0f0; */
        `
      )}
    >
      <Table {...tableDefaultProps} {...props} />
    </div>
  );
}
