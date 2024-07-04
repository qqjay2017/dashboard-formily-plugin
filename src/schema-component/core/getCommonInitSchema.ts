
export const commonInitSchema = {

    _isJSONSchemaObject: true,
    version: "2.0",
    type: "void",

    "x-settings": "settings:block",
    "x-decorator": "PositionDecorator",
    "x-component-props": {

    },
    "x-reactions": {
        dependencies: {
            'projectSelect': 'projectSelect'
        },
        when: true,
        fulfill: {
            schema: {
                'x-component-props.query': '{{$deps}}'
            },

        },

    },

}
