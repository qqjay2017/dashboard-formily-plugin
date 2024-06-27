import { ISchema } from "@formily/react";
import { getCompomentTypeInfoSchema, positionDecoratorFormItemSchema } from "../../../components/DashboardRoot/setting-schema";


export const ProjectBudgetSettingSchema: ISchema = {
    type: "object",
    properties: {
        ...getCompomentTypeInfoSchema(),
        ...positionDecoratorFormItemSchema

    },
};
