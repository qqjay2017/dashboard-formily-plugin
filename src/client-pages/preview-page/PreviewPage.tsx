import { useContext, useMemo } from "react";

import {
  FormProvider,
  RecursionField,
  SchemaOptionsContext,
} from "@formily/react";
import { get } from "lodash-es";
import { Helmet } from "react-helmet";
import { createForm } from "@formily/core";
import type { DashboardItem } from "../dashboard/types";
import type { APiWrap } from "@/api-client";
import { useRequest } from "@/api-client";
import { RecursionSchemaComponentWrap } from "@/schema-component/core";
import { useAppSpin } from "@/application/hooks";
import { useReportId } from "@/schema-component/hooks";
import { apiBase } from "@/utils";
import {
  useAsyncProjectDataSource,
  useAsyncQuarterDataSource,
  useProjectSelectScope,
} from "@/schema-component/widgets";

function PreviewPage() {
  const { reportId: shareURL } = useReportId();

  const { render } = useAppSpin();
  const options = useContext(SchemaOptionsContext);
  const { data, isLoading } = useRequest<APiWrap<DashboardItem>>(
    `${apiBase}/dashboard/preview/${shareURL}`,
    {
      method: "GET",
      refreshDeps: [shareURL],
    }
  );
  const name = get(data, "data.data.name");
  const description = get(data, "data.data.description");
  const schema = get(data, "data.data.content", "{}") || "{}";

  const projectSelectScope = useProjectSelectScope();
  const form = useMemo(() => createForm(), [schema]);
  if (!schema || isLoading || !projectSelectScope) {
    return render();
  }

  const json = JSON.parse(schema);
  const renderShema = {
    type: "void",
    properties: {
      dashboardRoot: {
        _isJSONSchemaObject: true,
        version: "2.0",
        type: "void",

        name: "dashboardRoot",

        "x-component": "DashboardRoot",
        "x-settings": "settings:root",
        "x-component-props": {
          designWidthEnum: "1920",
          cols: 12,
          rows: 12,
          rowheight: 80,
          designWidth: 1920,
          designHeight: 1080,

          breakpoints: {
            showroom: 2600,
            desktop: 1300,
            tablet: 500,
            mobile: 0,
          },
          themeProvider: "technologyBlue",
          isDarkTheme: true,
          ...json.root,
        },
        properties: json?.schema?.properties,
      },
    },
  };

  return (
    <FormProvider form={form}>
      <RecursionSchemaComponentWrap
        components={{
          ...options?.components,
        }}
        scope={{
          ...options?.scope,
          ...projectSelectScope,
          useAsyncProjectDataSource,
          useAsyncQuarterDataSource,
          dashboardDt: get(data, "data.data", {}) || {},
        }}
      >
        <Helmet>
          <title>{name}</title>
          <meta name="description" content={description} />
        </Helmet>

        <RecursionField schema={renderShema} name="DashboardRootPreview" />
      </RecursionSchemaComponentWrap>
    </FormProvider>
  );
}

export default PreviewPage;
