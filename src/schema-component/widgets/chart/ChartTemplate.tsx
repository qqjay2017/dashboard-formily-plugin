import { memo } from "react";

import { observer } from "@formily/react";
import { ChartTemplateWithDataSource } from "./ChartTemplateWithDataSource";
import { ChartTemplateWithOutData } from "./ChartTemplateWithOutData";

import type { SchemComponentWithDataSourceProps } from "@/types";
import { takeFirstApiInfo } from "@/schema-component/core";

interface ChartTemplateProps extends SchemComponentWithDataSourceProps {
  chartId?: string;
}

export function ChartTemplate(props: ChartTemplateProps) {
  const apiInfo = takeFirstApiInfo(props.apiInfo);

  if (apiInfo && apiInfo.dataSourceId) {
    return <ChartTemplateWithDataSource {...props} apiInfo={apiInfo} />;
  } else {
    return <ChartTemplateWithOutData {...props} />;
  }
}
