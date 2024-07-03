import { commonInitSchema } from "@/schema-component/core";
import { Schema } from "@formily/react";

export function getSchemeWrap(inject: any = {}) {
    return new Schema({
        ...commonInitSchema,
        "x-component": "QuarterSelect",
        ...inject,
        "x-decorator-props": {
            padding: [0, 0, 0, 0],
            w: 1.5,
            h: 0.6,
            ...inject?.["x-decorator-props"],
            // padding: 0
        },
    });
}