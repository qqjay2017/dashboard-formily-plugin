import { useContext } from "react";

import {
  ExpressionScope,
  FormProvider,
  RecursionField,
  SchemaComponentsContext,
  SchemaOptionsContext,
} from "@formily/react";
import { get } from "lodash-es";
import { Helmet } from "react-helmet";
import type { DashboardItem } from "../dashboard/types";
import {
  AiotMonitorBlock,
  ChartTemplate,
  ClassicFrame,
  ClassicFrame5,
  EmploymentCreditMng,
  Header1,
  Header5,
  HeaderMenu,
  KeyPersonArrived,
  LaborAttendance,
  ProjectAttendanceAnaTable,
  ProjectAttendanceDataAna,
  ProjectBudget,
  ProjectDesc,
  ProjectSelect,
  QuarterSelect,
  SmartHelmet,
  UnprocessedWarningList,
} from "@/schema-component/widgets";

import type { APiWrap } from "@/api-client";
import { useRequest } from "@/api-client";

import { useAppSpin } from "@/application/hooks";
import {
  useDashboardFormInstance,
  useReportId,
} from "@/schema-component/hooks";
import { apiBase } from "@/utils";
import {
  DashboardRootPreview,
  PositionDecoratorPreview,
} from "@/schema-component/components";

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

  const form = useDashboardFormInstance({
    designable: false,
  });
  if (!schema || isLoading || !form) {
    return render();
  }

  const json = JSON.parse(schema);
  const renderShema = {
    type: "void",
    properties: {
      DashboardRootPreview: {
        _isJSONSchemaObject: true,
        version: "2.0",
        type: "void",

        name: "DashboardRootPreview",

        "x-component": "DashboardRootPreview",
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
      <SchemaComponentsContext.Provider
        value={{
          Header1,
          Header5,
          HeaderMenu,
          LaborAttendance,
          ProjectDesc,
          EmploymentCreditMng,
          SmartHelmet,
          KeyPersonArrived,
          UnprocessedWarningList,
          ClassicFrame,
          ClassicFrame5,

          ProjectBudget,

          ProjectAttendanceDataAna,
          ProjectAttendanceAnaTable,
          QuarterSelect,
          ProjectSelect,
          ChartTemplate,
          AiotMonitorBlock,
          DashboardRootPreview,
          PositionDecorator: PositionDecoratorPreview,
        }}
      >
        <ExpressionScope
          value={{
            scope: {
              dashboardDt: get(data, "data.data", {}) || {},
            },
          }}
        >
          <RecursionField schema={renderShema} name="DashboardRootPreview" />
        </ExpressionScope>
      </SchemaComponentsContext.Provider>

      <Helmet>
        <title>{name}</title>
        <meta name="description" content={description} />
      </Helmet>
    </FormProvider>
  );
}

export default PreviewPage;
