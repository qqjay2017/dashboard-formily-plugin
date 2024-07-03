import * as React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/utils";
import { css } from "@emotion/css";
import { useToken } from "@/style";

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

export {
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
