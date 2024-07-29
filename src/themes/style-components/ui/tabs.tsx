import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { css } from '@emotion/css'
import { cx, rs } from '@/utils'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cx(
      css`
        display: inline-flex;
        padding: 0;
        justify-content: center;
        align-items: center;
      `,

      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cx(
      css`
        all: unset;
        height: 100%;
        padding: 0.06rem 0.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.12rem;
        line-height: 0.16rem;
        font-weight: 400;
        white-space: nowrap;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 300ms;
        background-color: rgb(39, 39, 42);
        color: rgb(161, 161, 170);
        outline: none;
        border: none;
        cursor: pointer;
        &[data-state="active"] {
          font-weight: 500;
          color: rgb(250, 250, 250);
          background-color: rgb(9, 9, 11);
        }
      `,
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cx(css``, className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

const TabsTrigger2Img = rs('/assets/ui/tabs/nodeCardTitleBg2.png')
const ActiveTabsTrigger2Img = rs('/assets/ui/tabs/nodeCardTitleBg3.png')

const TabsTrigger2 = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cx(
      css`
        min-width: 0.68rem;
        all: unset;
        height: 100%;
        padding: 0.06rem 0.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.12rem;
        line-height: 0.14rem;
        font-weight: 400;
        white-space: nowrap;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 300ms;

        outline: none;
        border: none;
        cursor: pointer;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url(${TabsTrigger2Img});
        opacity: 0.8;

        &[data-state="active"] {
          opacity: 1;
          font-weight: 500;

          background-image: url(${ActiveTabsTrigger2Img});
        }
      `,
      className,
    )}
    {...props}
  />
))

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsTrigger2 }
