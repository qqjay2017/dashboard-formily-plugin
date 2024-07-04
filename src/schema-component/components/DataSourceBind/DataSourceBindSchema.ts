


export function getDataSourceBindSchema() {
    return {
        dataSource: {
            type: "object",
            title: "数据源",
            required: false,
            "x-decorator": "FormItem",
            "x-component": "DataSourceBind",
        }
    }
}
