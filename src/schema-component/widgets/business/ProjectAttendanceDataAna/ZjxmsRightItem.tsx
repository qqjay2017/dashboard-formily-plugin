import { css } from "@emotion/css";

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
          color: rgba(195, 212, 229, 0.7);
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
