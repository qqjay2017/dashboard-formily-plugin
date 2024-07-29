import type { PropsWithChildren } from "react";
import React from "react";
import { useWorkbench } from "../hooks";
import { Workspace } from "./Workspace";

export function Workbench({ children }: PropsWithChildren) {
  const workbench = useWorkbench();

  return <Workspace id={workbench.currentWorkspace?.id}>{children}</Workspace>;
}
