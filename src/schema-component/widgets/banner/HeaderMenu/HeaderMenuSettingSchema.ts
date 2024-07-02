import { getDataSourceBindSchema } from "@/schema-component/components";
import { getCompomentTypeInfoSchema } from "@/schema-component/components/DashboardRoot/setting-schema";
import { ISchema } from "@formily/react";



export const HeaderMenuSettingSchema: ISchema = getCompomentTypeInfoSchema({
    ...getDataSourceBindSchema(),
})


