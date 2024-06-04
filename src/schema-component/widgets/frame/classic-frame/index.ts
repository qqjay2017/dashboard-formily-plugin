import { Schema } from '@formily/react';

export * from './ClassicFrame'

export const ClassicFrameSchemeWrap = (inject: any = {}) => {
    return new Schema({
        _isJSONSchemaObject: true,
        version: "2.0",
        type: "void",
        "x-component": "ClassicFrame",
        "x-settings": "settings:block",
        "x-decorator": "PositionDecorator",
        ...inject
    });
}