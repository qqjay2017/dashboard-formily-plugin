import { css } from "@emotion/css";
import type { SpinProps } from "antd";
import { Spin } from "antd";

export default function PageLoading({ ...rest }: SpinProps & any) {
  return (
    <div
      className={css`
        padding-block-start: 100px;
        text-align: center;
      `}
    >
      <Spin size="large" {...rest} />
    </div>
  );
}
