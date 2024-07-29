import { observer } from "@formily/reactive-react";
import type { FC } from "react";
import { Button, Result } from "antd";
import { css } from "@emotion/css";
import type Application from "../Application";

export const AppError: FC<{ error: Error; app: Application }> = observer(
  ({ error }) => {
    return (
      <div>
        <Result
          className={css`
            top: 50%;
            position: absolute;
            width: 100%;
            transform: translate(0, -50%);
          `}
          status="error"
          title="Application error"
          subTitle={error?.message}
          extra={[
            <Button
              type="primary"
              key="try"
              onClick={() => window.location.reload()}
            >
              Try again
            </Button>,
          ]}
        />
      </div>
    );
  },
  { displayName: "AppError" }
);
