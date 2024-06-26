import { Header1SchemeWrap } from "../../banner";
import { ClassicFrameSchemeWrap, ProjectBudgetSchemeWrap, StatisticSchemeWrap } from "../../widgets";
import { ISchema } from '@formily/react'
export const allComponentTypInitSchema: Record<string, (inject?: any) => ISchema> = {
    "ClassicFrame": ClassicFrameSchemeWrap,
    Statistic: StatisticSchemeWrap,
    Header1: Header1SchemeWrap,
    ProjectBudget: ProjectBudgetSchemeWrap
}