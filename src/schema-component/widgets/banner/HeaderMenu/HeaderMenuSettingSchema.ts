import { getDataSourceBindSchema } from "@/schema-component/components";
import { getCompomentTypeInfoSchema, positionDecoratorFormItemSchema } from "@/schema-component/components/DashboardRoot/setting-schema";
import { ISchema } from "@formily/react";



export const HeaderMenuSettingSchema: ISchema = {
    type: "object",
    properties: {
        ...getCompomentTypeInfoSchema(),
        ...getDataSourceBindSchema(),
        ...positionDecoratorFormItemSchema

    },
};
