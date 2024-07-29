import { isStr } from "@/designable/shared";
import { IconWidget } from "@/designable/react";

function takeIcon(message: string) {
  if (!isStr(message)) return;
  const matched = message.match(/@([^:\s]+)(?:\s*:\s*([\s\S]+))?/);
  if (matched) return [matched[1], matched[2]];
}
