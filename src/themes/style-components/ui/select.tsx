import * as React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import { css } from "@emotion/css";

import { cn } from "@/utils";
import { useToken } from "@/schema-component/antd/style";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} className={cn(className)} {...props}>
    {children}
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => {
  const { token } = useToken();
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
        className,
        css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 25px;
          color: ${token.textCommon};
          cursor: default;
        `
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  );
});
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => {
  const { token } = useToken();
  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn(
        className,
        css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 25px;
          color: ${token.textCommon};
          cursor: default;
        `
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  );
});
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => {
  const { token } = useToken();
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          className,
          css`
            margin-top: 0;
            margin-left: 0;
            overflow: hidden;
            width: 330px;
            max-height: 370px !important;
            border-radius: 0px 0px 0px 0px;
            border: 1px solid #0b5fa0;
            z-index: 9999;
            background-color: ${token.popover?.bg};
            border-radius: 0px 0px 0px 0px;
            border: 1px solid ${token.popover?.border};
            box-sizing: border-box;
            * {
              box-sizing: border-box;
            }
          `
        )}
        ref={ref}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  const { token } = useToken();
  const menuItemActiveCss = css`
    background-color: ${token.popover?.accentBg}!important;
    color: ${token.popover?.accentForeground}!important;
  `;
  return (
    <SelectPrimitive.SelectItem
      ref={ref}
      className={cn(
        className,
        css`
          box-sizing: border-box;
          * {
            box-sizing: border-box;
          }

          all: unset;
          display: block;
          width: 100%;
          min-height: 34px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: ${token.textCommon};
          font-size: 0.14rem;
          line-height: 0.22rem;
          padding: 0px;
          cursor: pointer;

          &:hover,
          &[data-state="checked"] {
            ${menuItemActiveCss}
          }
          &[data-disabled] {
            cursor: not-allowed;
            opacity: 0.7;
          }
        `
      )}
      {...props}
    >
      <div
        className={css`
          max-width: 280px;
        `}
      >
        {children}
      </div>
    </SelectPrimitive.SelectItem>
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

const baseSelectValueArrowImg = `data:image/png;base64,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`;

const BaseSelectValue = React.forwardRef<
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
          border: 1px solid ${token.popover.border};
          background-color: ${token.popover.bg};
          color: ${token.popover.foreground};
          padding-left: 0.2rem;
          position: relative;
          min-height: 0.2rem;
        `
      )}
      {...props}
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
        {value || placeholder}
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
});

export {
  baseSelectValueArrowImg,
  BaseSelectValue,
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
