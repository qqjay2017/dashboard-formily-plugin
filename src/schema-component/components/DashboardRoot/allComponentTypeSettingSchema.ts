import { ISchema } from '@formily/react'

import { dashboardRootFormSchema } from './setting-schema';
import { ClassicFrameSettingSchema, ProjectBudgetSettingSchema, ProjectTypePercentSettingSchema, StatisticSettingSchema } from '../../widgets';
import { Header1SettingSchema } from '../../banner';





export const allComponentTypeSettingSchema: Record<string, ISchema> = {

    "DashboardRoot": dashboardRootFormSchema,

    Header1: Header1SettingSchema,
    ClassicFrame: ClassicFrameSettingSchema,
    Statistic: StatisticSettingSchema,
    ProjectBudget: ProjectBudgetSettingSchema,
    ProjectTypePercent: ProjectTypePercentSettingSchema

}
