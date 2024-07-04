import { getCompomentTypeInfoSchema } from "@/schema-component/components/DashboardRoot/setting-schema";
import { ISchema } from "@formily/react";



export const settingSchema: ISchema = getCompomentTypeInfoSchema({
    queryType: {
        type: 'string',
        title: "查询类型",
        required: false,
        "x-decorator": "FormItem",
    },

})
