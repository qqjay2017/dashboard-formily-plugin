import React, { ComponentType, FC, PropsWithChildren } from "react";
import { BlankComponent } from "../components";

export function normalizeContainer(
  container: Element | ShadowRoot | string
): Element | null {
  if (!container) {
    console.warn(
      `Failed to mount app: mount target should not be null or undefined.`
    );
    return null;
  }

  if (typeof container === "string") {
    const res = document.querySelector(container);
    if (!res) {
      console.warn(
        `Failed to mount app: mount target selector "${container}" returned null.`
      );
    }
    return res;
  }
  if (
    window.ShadowRoot &&
    container instanceof window.ShadowRoot &&
    container.mode === "closed"
  ) {
    console.warn(
      `mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`
    );
  }
  return container as any;
}

export const compose = (
  ...components: [ComponentType<PropsWithChildren>, any][]
) => {
  const Component = components.reduce<ComponentType<PropsWithChildren>>(
    (Parent, child) => {
      const [Child, childProps] = child;
      const ComposeComponent: FC<PropsWithChildren> = ({ children }) => (
        <Parent>
          <Child {...childProps}>{children}</Child>
        </Parent>
      );
      ComposeComponent.displayName = `compose(${
        Child.displayName || Child.name
      })`;
      return ComposeComponent;
    },
    BlankComponent
  );

  return (LastChild?: ComponentType) =>
    ((props?: any) => {
      return <Component>{LastChild && <LastChild {...props} />}</Component>;
    }) as FC;
};
