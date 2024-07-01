import { getCompomentTypeInfoSchema, positionDecoratorFormItemSchema } from "@/schema-component/components/DashboardRoot/setting-schema";
import { ISchema } from "@formily/react";



export const ProjectBudgetSettingSchema: ISchema = {
    type: "object",
    properties: {
        ...getCompomentTypeInfoSchema(),

    },
};
