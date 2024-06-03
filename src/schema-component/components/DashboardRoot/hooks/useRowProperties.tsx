import { useFieldSchema } from "@formily/react";
import { useMemo } from "react";

export const useRowProperties = () => {
  const fieldSchema = useFieldSchema();
  return useMemo(() => {
    return fieldSchema.reduceProperties((buf, s) => {
      if (!s["x-hidden"]) {
        buf.push(s);
      }
      return buf;
    }, []);
  }, [Object.keys(fieldSchema.properties || {}).join(",")]);
};
