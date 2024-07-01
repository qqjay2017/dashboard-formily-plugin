import { ISchema } from "@formily/react";
import { DataSourceBind } from "../../components/DataSourceBind/DataSourceBind";
import { getCompomentTypeInfoSchema } from "../../components/DashboardRoot/setting-schema";


export const StatisticSettingSchema: ISchema = {
    type: "object",
    properties: {
        ...getCompomentTypeInfoSchema(),
        title: {
            type: "string",
            title: "标题",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "Input",

        },
        amount: {
            type: "string",
            title: "值",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "Input",
        },
        dataSource: {
            type: "object",
            title: "数据源",
            required: false,
            "x-decorator": "FormItem",
            "x-component": DataSourceBind,
        }

    },
};
