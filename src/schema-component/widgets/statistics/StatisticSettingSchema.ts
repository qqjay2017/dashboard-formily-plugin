import { ISchema } from "@formily/react";
import { DataSourceBind } from "../../components/DataSourceBind/DataSourceBind";
import { getCompomentTypeInfoSchema } from "../../components/DashboardRoot/setting-schema";
import { getDataSourceBindSchema } from "@/schema-component/components";


export const StatisticSettingSchema: ISchema = getCompomentTypeInfoSchema({
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
    ...getDataSourceBindSchema()
})

