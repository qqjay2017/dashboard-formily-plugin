import { Schema } from "@formily/react";
export function Header1SchemeWrap(inject: any = {}) {
    return new Schema({
        _isJSONSchemaObject: true,
        version: "2.0",
        type: "void",
        "x-component": "Header1",
        "x-settings": "settings:block",
        "x-decorator": "PositionDecorator",
        "x-component-props": {
            title: "{{dashboardDt.name}}",
            ...inject?.["x-component-props"],
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

        },

        ...inject,
        "x-decorator-props": {
            w: 12,
            h: 1.33,
            padding: [0, 0, 0, 0],
            ...inject?.["x-decorator-props"],
        },
    });
}
