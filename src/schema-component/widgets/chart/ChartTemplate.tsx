import { ChartTemplateWithDataSource } from "./ChartTemplateWithDataSource";
import { ChartTemplateWithOutData } from "./ChartTemplateWithOutData";

import type { SchemComponentWithDataSourceProps } from "@/types";
import { takeFirstApiInfo } from "@/schema-component/shared";
import injectApiInfo from "@/schema-component/hoc/injectApiInfo";

interface ChartTemplateProps extends SchemComponentWithDataSourceProps {
  chartId?: string;
}

function InternalChartTemplate(props: ChartTemplateProps) {
  return <ChartTemplateWithOutData {...props} />;
}

export const ChartTemplate = injectApiInfo(InternalChartTemplate);
