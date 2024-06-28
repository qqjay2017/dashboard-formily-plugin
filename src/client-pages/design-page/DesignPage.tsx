import { useParams } from "react-router-dom";
import { APiWrap, useRequest } from "../../api-client";
import { DashboardItem } from "../../demo/types";
import { get } from "lodash-es";

import { useContext } from "react";
import { RecursionField, SchemaOptionsContext } from "@formily/react";
import { RecursionSchemaComponentWrap } from "../../schema-component/core";
import { useAppSpin } from "../../application";
import { useDashboardDt } from "./useDashboardDt";

export const DesignPage = () => {
  const { render } = useAppSpin();
  const options = useContext(SchemaOptionsContext);
  const { data, isLoading } = useDashboardDt();
  const schema = get(data, "data.data.content", "");

  return (
    <RecursionSchemaComponentWrap
      components={options.components}
      scope={{
        ...options.scope,
        dashboardDt: get(data, "data.data", {}),
      }}
    >
      {!schema || isLoading ? (
        render()
      ) : (
        <RecursionField schema={JSON.parse(schema)} />
      )}
    </RecursionSchemaComponentWrap>
  );
};
