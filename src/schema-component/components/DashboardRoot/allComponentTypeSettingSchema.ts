import { ISchema } from '@formily/react'

import { dashboardRootFormSchema } from './setting-schema';
import { ClassicFrameSettingSchema, Header1SettingSchema, HeaderMenuSettingSchema, ProjectBudgetSettingSchema, ProjectTypePercentSettingSchema, StatisticSettingSchema } from '../../widgets';






export const allComponentTypeSettingSchema: Record<string, ISchema> = {

    "DashboardRoot": dashboardRootFormSchema,

    Header1: Header1SettingSchema,
    ClassicFrame: ClassicFrameSettingSchema,
    Statistic: StatisticSettingSchema,
    ProjectBudget: ProjectBudgetSettingSchema,
    ProjectTypePercent: ProjectTypePercentSettingSchema,
    HeaderMenu: HeaderMenuSettingSchema

}
