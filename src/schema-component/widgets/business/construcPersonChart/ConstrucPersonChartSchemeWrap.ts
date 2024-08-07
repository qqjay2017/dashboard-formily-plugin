import { commonInitSchema } from "@/schema-component/core";
import { Schema } from "@formily/react";

export function ConstrucPersonChartSchemeWrap(inject: any = {}) {
    return new Schema({
        ...commonInitSchema,
        "x-component": "ConstrucPersonChart",
        ...inject,

        "x-decorator-props": {
            padding: [24, 24, 24, 24],
            w: 3,
            h: 3,
            ...inject?.["x-decorator-props"],
            // padding: 0
        },
    });
}