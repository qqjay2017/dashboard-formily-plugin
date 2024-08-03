import { css } from "@emotion/css";
import src from "node_modules/@emotion/styled/dist/declarations/src";

export function iconColumnRender(_, record) {
  if (!record.icon) {
    return null;
  }
  return (
    <img
      src={record.icon}
      className={css`
        max-width: 32px;
        max-height: 32px;
      `}
    />
  );
}
