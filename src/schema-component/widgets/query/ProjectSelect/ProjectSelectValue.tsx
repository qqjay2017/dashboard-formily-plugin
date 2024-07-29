import { css } from "@emotion/css";
import { forwardRef } from "react";
import { useToken } from "@/schema-component/antd/style";
import { cn } from "@/utils";

const arrowImg = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAASCAYAAABIB77kAAAAAXNSR0IArs4c6QAAAO9JREFUSEu91M0RgjAQBeC3jh7UsQca4UAFlmIJhBIsxQo40Ag9OOpBx5XgEHAgPwsZuULyZcPbJfz5oc6r7nx6ES7ZluqYZygfnKwZx3RHZ71vC1Y3zsFQRKifK2SxUI1t3iiZkTSSSvdUUId1VcVCfzCzORRVV1Yg5MNrXIpOYhpgFN8rjYi6sPRAqg9NBNSHmdCYpC5AQ7AROPd6Q7FJUIpKMCsYikoxJ+hD9XvT1MOeYhQ6jbZpZVJq+8DWMm1b6QkiwLwVutI7OqCnsn7YBE7qqUrN0kAsuEJnpQJMDI6CJMRmgQYF4Eqj7U99ANQ/yn6JLeLZAAAAAElFTkSuQmCC`;

export const ProjectSelectValue = forwardRef<
  HTMLDivElement,
  {
    value?: string;
    children?: any;
    placeholder?: string;
    open?: boolean;
    className?: string;
  }
>(({ children, value, placeholder, open, className, ...props }, ref) => {
  const { token } = useToken();
  return (
    <div
      ref={ref}
      className={cn(
        className,
        css`
          width: 100%;
          height: 100%;

          color: ${token.popover.foreground};
          padding-left: 0.12rem;
          position: relative;
        `
      )}
      {...props}
    >
      <div
        className={css`
          height: 100%;
          width: calc(100% - 0.4rem);

          font-weight: 500;
          font-size: 0.22rem;
          color: #c3f4ff;
          line-height: 0.22rem;
          margin-right: 8px;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: flex;
          align-items: center;
        `}
      >
        {value || placeholder}
      </div>
      <div
        className={css`
          width: 0.14rem;
          height: 0.1rem;
          background-size: contain;
          background-repeat: no-repeat;
          background-image: url(${arrowImg});
          position: absolute;
          right: 0.08rem;
          top: 50%;
          margin-top: -0.07rem;
          background-position: center;
          transform-origin: center center;

          transition: all 0.5s;
          transform: ${open ? "rotate(180deg)" : "rotate(0deg)"};
        `}
      />
    </div>
  );
});
