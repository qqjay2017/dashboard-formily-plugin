import { ISchema } from "@formily/react";
import { compomentTypeInfoSchema, positionDecoratorFormItemSchema } from "../../../components/DashboardRoot/setting-schema";


export const ProjectBudgetSettingSchema: ISchema = {
    type: "object",
    properties: {
        ...compomentTypeInfoSchema,
        ...positionDecoratorFormItemSchema

    },
};
