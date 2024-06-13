import React, { PropsWithChildren } from "react";
import { useQuery, useReqApiProxy } from "../../api-client";
import { get } from "lodash-es";
import { css } from "@emotion/css";
import ReactJson from "react-json-view";
import { Tabs } from "antd";
import { AxiosHeaders } from "axios";

function ApiTestItemWrap({ children }: PropsWithChildren) {
  return (
    <div
      className={css`
        height: calc(80vh - 160px);
        width: 100%;
        max-height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
      `}
    >
      {children}
    </div>
  );
}

export const ApiTest = ({
  apiId,
  formValues,
}: {
  apiId?: string;
  formValues?: any;
}) => {
  const { request } = useReqApiProxy();
  const { data, refetch, error, isError, isLoading } = useQuery({
    queryKey: ["apiTest", apiId, ...Object.keys(formValues || {})],
    queryFn: () =>
      request({
        formValues,
        apiId,
        headers: {},
      }),
  });

  const resData = get(data, "data", {});

  const headers: AxiosHeaders = data?.headers as any as AxiosHeaders;

  return (
    <div
      className={css`
        max-height: 70vh;
        height: 70vh;
        width: 100%;
        overflow: hidden;
      `}
    >
      <Tabs
        defaultActiveKey="body"
        items={[
          {
            key: "body",
            tabKey: "body",
            label: "Body",
            children: (
              <ApiTestItemWrap>
                <ReactJson src={resData} />
              </ApiTestItemWrap>
            ),
          },
          {
            key: "headers",
            tabKey: "headers",
            label: "Headers",
            children: (
              <ApiTestItemWrap>
                <ReactJson
                  src={
                    headers && headers.toJSON
                      ? JSON.parse(JSON.stringify(headers.toJSON()))
                      : {}
                  }
                />
              </ApiTestItemWrap>
            ),
          },
          {
            key: "status",
            tabKey: "status",
            label: "Status",
            children: (
              <ApiTestItemWrap>
                <ReactJson
                  src={{
                    status: data?.status,
                    statusText: data?.statusText,
                  }}
                />
              </ApiTestItemWrap>
            ),
          },
        ]}
      />
    </div>
  );
};
