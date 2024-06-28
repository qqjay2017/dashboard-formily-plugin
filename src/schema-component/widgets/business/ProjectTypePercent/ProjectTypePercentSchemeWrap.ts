
import { Schema } from "@formily/react";

export function ProjectTypePercentSchemeWrap(inject: any = {}) {
    return new Schema({
        _isJSONSchemaObject: true,
        version: "2.0",
        type: "void",
        "x-component": "ProjectTypePercent",
        "x-settings": "settings:block",
        "x-decorator": "PositionDecorator",
        "x-component-props": {

        },

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