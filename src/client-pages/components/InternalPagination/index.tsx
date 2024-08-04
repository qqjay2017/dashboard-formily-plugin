import { css, cx } from "@emotion/css";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";

export default function InternalPagination(props: PaginationProps) {
  return (
    <Pagination
      className={cx(
        css`
          padding: 0px 24px 16px 24px;
          background-color: #fff;
          .ant-pagination-total-text {
            flex: 1;
          }
        `,
        props.className
      )}
      align="end"
      showTotal={(total) => `共 ${total} 条记录`}
      showSizeChanger
      {...props}
    />
  );
}
