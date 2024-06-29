import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useAppSpin } from "../../application";
import { APiWrap, useRequest } from "../../api-client";
import { RecursionField, SchemaOptionsContext } from "@formily/react";
import { DashboardItem } from "../../demo/types";
import { get } from "lodash-es";
import { RecursionSchemaComponentWrap } from "../../schema-component/core";
import { Helmet } from "react-helmet";
import { useReportId } from "@/schema-component";

export const PreviewPage = () => {
  const { reportId: shareURL } = useReportId();

  const { render } = useAppSpin();
  const options = useContext(SchemaOptionsContext);
  const { data, isLoading } = useRequest<APiWrap<DashboardItem>>(
    `/huang-api/dashboard/preview/${shareURL}`,
    {
      method: "GET",
      refreshDeps: [shareURL],
    }
  );
  const name = get(data, "data.data.name");
  const description = get(data, "data.data.description");
  const schema = get(data, "data.data.content", "{}");

  return (
    <RecursionSchemaComponentWrap
      components={options.components}
      scope={options.scope}
    >
      <Helmet>
        <link rel="icon" href="/public/oss/kxgc_logo.png" />
        <title>{name}</title>
        <meta name="description" content={description} />
      </Helmet>
      {!schema || isLoading ? (
        render()
      ) : (
        <RecursionField schema={JSON.parse(schema)} key={schema} />
      )}
    </RecursionSchemaComponentWrap>
  );
};
