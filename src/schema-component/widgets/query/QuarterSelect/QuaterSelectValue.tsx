import { css } from "@emotion/css";
import { forwardRef } from "react";
import { useToken } from "@/schema-component/antd/style";
import { cn } from "@/utils";
import type { SelectValueProps } from "@/dashboard-themes/ui";
import { baseSelectValueArrowImg } from "@/dashboard-themes/ui";

export function QuaterSelectValue({
  children,
  value,
  label,
  placeholder,
  open,
  className,
}: SelectValueProps) {
  const { token } = useToken();
  return (
    <div
      className={cn(
        className,
        css`
          width: 100%;
          height: 100%;
          border: 1px solid ${token.popover.border};
          background-color: ${token.popover.bg};
          color: ${token.popover.foreground};
          padding-left: 0.2rem;
          position: relative;
        `
      )}
    >
      <div
        className={css`
          width: 4px;
          height: 4px;
          background: #f0b315;
          border-radius: 50%;
          position: absolute;
          left: 0.08rem;
          top: 50%;
          margin-top: -2px;
        `}
      />
      <div
        className={css`
          height: 100%;
          width: calc(100% - 0.4rem);
          display: flex;
          align-items: center;
          color: #c7e1ff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #fff;
        `}
      >
        {label || placeholder}
      </div>
      <div
        className={css`
          width: 0.2rem;
          height: 0.2rem;
          background-size: contain;
          background-repeat: no-repeat;
          background-image: url(${baseSelectValueArrowImg});
          position: absolute;
          right: 0.08rem;
          top: 50%;
          margin-top: -0.1rem;
          background-position: center;
          transform-origin: center center;
          transform: rotate(180deg);
          transition: all 0.5s;
        `}
        style={{
          transform: open ? `rotate(0deg)` : `rotate(180deg)`,
        }}
      />
    </div>
  );
}
