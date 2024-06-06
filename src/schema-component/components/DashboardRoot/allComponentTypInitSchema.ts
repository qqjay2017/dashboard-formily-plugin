import { ClassicFrameSchemeWrap, StatisticSchemeWrap } from "../../widgets";
import { ISchema } from '@formily/react'
export const allComponentTypInitSchema: Record<string, (inject?: any) => ISchema> = {
    "ClassicFrame": ClassicFrameSchemeWrap,
    Statistic: StatisticSchemeWrap
}