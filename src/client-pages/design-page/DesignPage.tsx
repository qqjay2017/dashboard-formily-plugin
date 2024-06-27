import { useParams } from "react-router-dom";
import { APiWrap, useRequest } from "../../api-client";
import { DashboardItem } from "../../demo/types";
import { get } from "lodash-es";

import { useContext } from "react";
import { RecursionField, SchemaOptionsContext } from "@formily/react";
import { RecursionSchemaComponentWrap } from "../../schema-component/core";
import { useAppSpin } from "../../application";

export const DesignPage = () => {
  const { id } = useParams();

  const { render } = useAppSpin();
  const options = useContext(SchemaOptionsContext);
  const { data, isLoading } = useRequest<APiWrap<DashboardItem>>(
    `/huang-api/dashboard/${id}`,
    {
      method: "GET",
      refreshDeps: [id],
    }
  );
  const schema = get(data, "data.data.content", "");

  return (
    <RecursionSchemaComponentWrap
      components={options.components}
      scope={options.scope}
    >
      {!schema || isLoading ? (
        render()
      ) : (
        <RecursionField schema={JSON.parse(schema)} />
      )}
    </RecursionSchemaComponentWrap>
  );
};
