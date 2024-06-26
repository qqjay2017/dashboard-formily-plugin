import { ISchema } from "@formily/react";
import { DataSourceBind } from "../../components/DataSourceBind/DataSourceBind";
import { compomentTypeInfoSchema } from "../../components/DashboardRoot/setting-schema";


export const StatisticSettingSchema: ISchema = {
    type: "object",
    properties: {
        ...compomentTypeInfoSchema,
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

        // busType: {
        //     type: "string",
        //     title: "绑定业务",
        //     required: true,
        //     "x-decorator": "FormItem",
        //     "x-component": "Select",
        //     'x-component-props': {
        //         options: [
        //             {
        //                 label: '安全',
        //                 value: 'aq'
        //             },
        //             {
        //                 label: '项目',
        //                 value: 'xm'
        //             },
        //         ]
        //     }

        // },
        // busField: {
        //     type: "string",
        //     title: "绑定字段",
        //     required: true,
        //     "x-decorator": "FormItem",
        //     "x-component": "Select",
        //     'x-component-props': {
        //         options: [
        //             {
        //                 label: '工程造价',
        //                 value: 'gczj'
        //             },
        //             {
        //                 label: '剩余工期',
        //                 value: 'gq'
        //             },
        //         ]
        //     }

        // },

    },
};
