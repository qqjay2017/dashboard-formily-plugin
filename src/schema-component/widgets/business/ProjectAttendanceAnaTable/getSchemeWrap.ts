import { commonInitSchema } from "@/schema-component/core";
import { Schema } from "@formily/react";

export function getSchemeWrap(inject: any = {}) {
    return new Schema({
        ...commonInitSchema,
        "x-component": "ProjectAttendanceAnaTable",
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