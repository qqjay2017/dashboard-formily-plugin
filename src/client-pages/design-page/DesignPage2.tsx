import { get } from "lodash-es";

import { FormProvider, SchemaOptionsContext } from "@formily/react";

import { useDashboardDt } from "./useDashboardDt";
import { DesignEngine } from "./DesignEngine";

import { useAppSpin } from "@/application/hooks";
import { useFetchChartAll } from "@/schema-component/widgets";
import { useSchemaOptionsContext } from "@/schema-component/core";
import { useDashboardFormInstance } from "@/schema-component/hooks";

function DesignPage2() {
  const { data, isLoading, id } = useDashboardDt();
  const { data: chartAllRes, isLoading: isChartAllLoading } =
    useFetchChartAll();
  const schema = get(data, "data.data.content", "");
  const shareURL = get(data, "data.data.shareURL", "");
  const chartAll: any[] = get(chartAllRes, "data.data");

  const { scope, ...schemaOptions } = useSchemaOptionsContext();
  const { render } = useAppSpin();

  const form = useDashboardFormInstance({
    designable: true,
    deps: [schema, id],
  });

  if (!schema || isLoading || isChartAllLoading || !form) {
    return render();
  }

  return (
    <FormProvider form={form}>
      <SchemaOptionsContext.Provider
        value={{
          ...schemaOptions,

          scope: {
            ...scope,
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
    </FormProvider>
  );
}

export default DesignPage2;
