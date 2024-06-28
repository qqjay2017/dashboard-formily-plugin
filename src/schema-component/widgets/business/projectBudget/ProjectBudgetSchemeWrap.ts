import { Schema } from "@formily/react";

export function ProjectBudgetSchemeWrap(inject: any = {}) {
    return new Schema({
        _isJSONSchemaObject: true,
        version: "2.0",
        type: "void",
        "x-component": "ProjectBudget",
        "x-settings": "settings:block",
        "x-decorator": "PositionDecorator",
        "x-component-props": {

        },

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