import { commonInitSchema } from "@/schema-component/core";
import { Schema } from "@formily/react";

export function ProjectBudgetSchemeWrap(inject: any = {}) {
    return new Schema({
        ...commonInitSchema,
        "x-component": "ProjectBudget",
        ...inject,
        "x-decorator-props": {
            padding: [12, 12, 12, 12],
            w: 3,
            h: 3,
            ...inject?.["x-decorator-props"],
            // padding: 0
        },
    });
}