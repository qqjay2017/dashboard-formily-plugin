import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useAppSpin } from "../../application";
import { APiWrap, useRequest } from "../../api-client";
import { RecursionField, SchemaOptionsContext } from "@formily/react";
import { DashboardItem } from "../../demo/types";
import { get } from "lodash-es";
import { RecursionSchemaComponentWrap } from "../../schema-component/core";

export const PreviewPage = () => {
  const { shareURL } = useParams();

  const { render } = useAppSpin();
  const options = useContext(SchemaOptionsContext);
  const { data, isLoading } = useRequest<APiWrap<DashboardItem>>(
    `/huang-api/dashboard/preview/${shareURL}`,
    {
      method: "GET",
      refreshDeps: [shareURL],
    }
  );
  const schema = get(data, "data.data.content", "{}");

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
