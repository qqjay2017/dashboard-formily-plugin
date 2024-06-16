import React, { PropsWithChildren } from "react";
import { useQuery, useReqApiProxy } from "../../api-client";
import { get } from "lodash-es";
import { css } from "@emotion/css";

import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/zh-cn";

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

const jsonViewOnlyProps = {
  viewOnly: true,
  width: "100%",
  height: "100%",
  locale,
};

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
                <JSONInput
                  {...jsonViewOnlyProps}
                  id="body-apitest"
                  placeholder={resData}
                />
              </ApiTestItemWrap>
            ),
          },
          {
            key: "headers",
            tabKey: "headers",
            label: "Headers",
            children: (
              <ApiTestItemWrap>
                <JSONInput
                  {...jsonViewOnlyProps}
                  id="headers-apitest"
                  placeholder={
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
                <JSONInput
                  {...jsonViewOnlyProps}
                  id="status-apitest"
                  placeholder={{
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
