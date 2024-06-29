
import { Schema } from "@formily/react";

export function HeaderMenuSchemeWrap(inject: any = {}) {
    return new Schema({
        _isJSONSchemaObject: true,
        version: "2.0",
        type: "void",
        "x-component": "HeaderMenu",
        "x-settings": "settings:block",
        "x-decorator": "PositionDecorator",
        "x-component-props": {

        },

        ...inject,
        "x-decorator-props": {
            padding: [0, 0, 0, 0],
            w: 12,
            h: 0.75,
            ...inject?.["x-decorator-props"],
            // padding: 0
        },
    });
}