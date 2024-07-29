import { css } from "@emotion/css";
import { useToken } from "@/schema-component/antd/style";

export function ZjxmsRightItem({
  label,
  count,
  unit,
  countColor,
}: {
  label: string;
  count?: any;
  unit: string;
  countColor: string;
}) {
  const { token } = useToken();
  return (
    <div
      className={css`
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      `}
    >
      <div
        className={css`
          font-size: 0.12rem;
          color: ${token.textCommon};
          line-height: 0.14rem;
        `}
      >
        {label}
      </div>
      <div
        className={css`
          font-weight: 600;
          font-size: 0.18rem;
          color: #64e3ff;
          line-height: 0.2rem;
        `}
        style={{
          color: countColor,
        }}
      >
        {count || "0"}
        {unit}
      </div>
    </div>
  );
}
