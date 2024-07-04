import { commonInitSchema } from "@/schema-component/core";
import { Schema } from "@formily/react";

export function getSchemeWrap(inject: any = {}) {
    return new Schema({
        ...commonInitSchema,
        type: "object",
        name: 'quarterSelect',
        "x-component": "QuarterSelect",

        ...inject,
        "x-decorator-props": {
            padding: [0, 0, 0, 0],
            w: 1.5,
            h: 0.5,
            ...inject?.["x-decorator-props"],
            // padding: 0
        },
        "x-reactions": {
            dependencies: {

            },
            when: true,
            fulfill: {
                schema: {
                    'x-component-props.query': '{{$deps}}'
                },

            },

        }
    });
}