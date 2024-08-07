
import { commonInitSchema } from "@/schema-component/core";
import { Schema } from "@formily/react";

export function ProjectTypePercentSchemeWrap(inject: any = {}) {
    return new Schema({
        ...commonInitSchema,
        "x-component": "ProjectTypePercent",
        ...inject,
        "x-decorator-props": {
            padding: [24, 12, 24, 12],
            w: 3,
            h: 3,
            ...inject?.["x-decorator-props"],
            // padding: 0
        },
    });
}