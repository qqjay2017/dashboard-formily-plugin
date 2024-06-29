
import { ClassicFrameSchemeWrap, ProjectBudgetSchemeWrap, ProjectTypePercentSchemeWrap, StatisticSchemeWrap, Header1SchemeWrap, HeaderMenuSchemeWrap } from "../../widgets";
import { ISchema } from '@formily/react'
export const allComponentTypInitSchema: Record<string, (inject?: any) => ISchema> = {
    "ClassicFrame": ClassicFrameSchemeWrap,
    Statistic: StatisticSchemeWrap,
    Header1: Header1SchemeWrap,
    ProjectBudget: ProjectBudgetSchemeWrap,
    ProjectTypePercent: ProjectTypePercentSchemeWrap,
    HeaderMenu: HeaderMenuSchemeWrap
}