import {
  DragDropDriver,
  KeyboardDriver,
  MouseClickDriver,
  MouseMoveDriver,
  ViewportResizeDriver,
  ViewportScrollDriver,
} from "./drivers";

import {
  useAutoScrollEffect,
  useCursorEffect,
  useDragDropEffect,
  useFreeSelectionEffect,
  useKeyboardEffect,
  useResizeEffect,
  useSelectionEffect,
  useTranslateEffect,
  useViewportEffect,
  useWorkspaceEffect,
} from "./effects";
import {
  CopyNodes,
  CursorSwitchSelection,
  DeleteNodes,
  PasteNodes,
  PreventCommandX,
  RedoMutation,
  SelectAllNodes,
  SelectNextNode,
  SelectNodes,
  SelectPrevNode,
  SelectSameTypeNodes,
  UndoMutation,
} from "./shortcuts";

export const DEFAULT_EFFECTS = [
  useFreeSelectionEffect,
  useCursorEffect,
  useViewportEffect,
  useDragDropEffect,
  useSelectionEffect,
  useKeyboardEffect,
  useAutoScrollEffect,
  useWorkspaceEffect,
  // useContentEditableEffect,
  useTranslateEffect,
  useResizeEffect,
];

export const DEFAULT_DRIVERS = [
  MouseMoveDriver,
  DragDropDriver,
  MouseClickDriver,
  ViewportResizeDriver,
  ViewportScrollDriver,
  KeyboardDriver,
];

export const DEFAULT_SHORTCUTS = [
  PreventCommandX,
  SelectNodes,
  SelectAllNodes,
  SelectSameTypeNodes,
  DeleteNodes,
  CopyNodes,
  PasteNodes,
  SelectPrevNode,
  SelectNextNode,
  UndoMutation,
  RedoMutation,
  CursorSwitchSelection,
];
