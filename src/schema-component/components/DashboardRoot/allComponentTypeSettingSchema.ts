import { ISchema } from '@formily/react'

import { ClassicFrame, dashboardRootFormSchema, Statistic, Header1 } from './setting-schema';





export const allComponentTypeSettingSchema: Record<string, ISchema> = {

    "DashboardRoot": dashboardRootFormSchema,
    ClassicFrame,
    Statistic,
    Header1

}
