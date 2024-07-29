import { get } from "lodash-es";

import { ExpressionScope, SchemaOptionsContext } from "@formily/react";
import { useDashboardDt } from "./useDashboardDt";
import { DesignEngine } from "./DesignEngine";

import {
  useAsyncProjectDataSource,
  useAsyncQuarterDataSource,
  useFetchChartAll,
  useProjectSelectScope,
  useSchemaOptionsContext,
} from "@/schema-component";
import { useAppSpin } from "@/application";

function DesignPage2() {
  const { data, isLoading } = useDashboardDt();
  const { data: chartAllRes, isLoading: isChartAllLoading } =
    useFetchChartAll();
  const schema = get(data, "data.data.content", "");
  const shareURL = get(data, "data.data.shareURL", "");
  const chartAll: any[] = get(chartAllRes, "data.data");

  const projectSelectScope = useProjectSelectScope();
  const { scope, ...schemaOptions } = useSchemaOptionsContext();
  const { render } = useAppSpin();

  if (!schema || isLoading || !projectSelectScope || isChartAllLoading) {
    return render();
  }

  return (
    <SchemaOptionsContext.Provider
      value={{
        ...schemaOptions,
        scope: {
          ...scope,
          ...projectSelectScope,
          useAsyncProjectDataSource,
          useAsyncQuarterDataSource,
          dashboardDt: get(data, "data.data", {}) || {},
          chartIdMap: (chartAll || []).reduce((memo, cur) => {
            memo[cur.id] = {
              ...cur,
            };
            return memo;
          }, {}),
        },
      }}
    >
      <DesignEngine schema={schema} shareURL={shareURL} chartAll={chartAll} />
    </SchemaOptionsContext.Provider>
  );
}

export default DesignPage2;
