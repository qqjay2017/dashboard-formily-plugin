import { get } from "lodash-es";

import { FormProvider, SchemaOptionsContext } from "@formily/react";

import { useMemo } from "react";
import { createForm } from "@formily/core";
import { useDashboardDt } from "./useDashboardDt";
import { DesignEngine } from "./DesignEngine";

import { useAppSpin } from "@/application/hooks";
import {
  useFetchChartAll,
  useProjectSelectScope,
} from "@/schema-component/widgets";

import { Field, PositionDecorator } from "@/designable/Field";
import SchemaComponentOptions from "@/schema-component/components/SchemaComponentOptions";

function DesignPage2() {
  const { data, isLoading, id } = useDashboardDt();
  const { data: chartAllRes, isLoading: isChartAllLoading } =
    useFetchChartAll();
  const schema = get(data, "data.data.content", "");
  const shareURL = get(data, "data.data.shareURL", "");
  const chartAll: any[] = get(chartAllRes, "data.data");

  const { render } = useAppSpin();
  const projectSelectScope = useProjectSelectScope();
  const form = useMemo(() => {
    if (!projectSelectScope) {
      return null;
    }
    return createForm({
      designable: true,
    });
  }, [projectSelectScope, schema]);

  if (!schema || isLoading || isChartAllLoading || !form) {
    return render();
  }

  return (
    <FormProvider form={form}>
      <SchemaComponentOptions
        components={{
          Field,
          PositionDecorator,
        }}
        scope={{
          dashboardDt: get(data, "data.data", {}) || {},
          chartIdMap: (chartAll || []).reduce((memo, cur) => {
            memo[cur.id] = {
              ...cur,
            };
            return memo;
          }, {}),
        }}
      >
        <DesignEngine schema={schema} shareURL={shareURL} chartAll={chartAll} />
      </SchemaComponentOptions>
    </FormProvider>
  );
}

export default DesignPage2;
