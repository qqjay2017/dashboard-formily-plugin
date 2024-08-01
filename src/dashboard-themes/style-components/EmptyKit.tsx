import { css } from "@emotion/css";
import type { PropsWithChildren } from "react";
import { LuLoader2 } from "react-icons/lu";
import { useToken } from "@/schema-component/antd/style/useToken";

interface EmptyKitProps extends PropsWithChildren {
  loading?: boolean;
  empty?: boolean;
  placeholder?: string;
  className?: string;
}

export function EmptyKit({
  loading = false,
  empty = false,
  placeholder = "暂无数据",
  children,
  className,
}: EmptyKitProps) {
  const { token } = useToken();
  if (loading || empty) {
    return (
      <div
        className={css`
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {loading && (
          <LuLoader2
            className={css`
              line-height: 0.24rem;
              font-size: 0.24rem;
              color: ${token.textPrimary};

              animation: spin 1s linear infinite;

              @keyframes spin {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
            `}
          />
        )}
        {empty && !loading ? (
          <div
            className={css`
              font-weight: 400;
              font-size: 0.16rem;
              color: ${token.textCommon};
              line-height: 0.2rem;
            `}
          >
            {placeholder}
          </div>
        ) : null}
      </div>
    );
  }
  return children;
}
