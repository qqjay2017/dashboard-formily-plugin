import type { PropsWithChildren } from 'react'
import React from 'react'
import { get } from 'lodash-es'
import { css } from '@emotion/css'

import { Tabs } from 'antd'
import type { AxiosHeaders } from 'axios'
import { useQuery, useReqApiProxy } from '@/api-client'
import { MonacoEditor } from '@/schema-component'

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
  )
}

const jsonEditProps: any = {
  scrollBeyondLastLine: true,
  height: '490px',
  theme: 'vs-dark',
  language: 'json',
  readOnly: false,
}

export function ApiTest({
  apiId,
  formValues,
}: {
  apiId?: string
  formValues?: any
}) {
  const { request } = useReqApiProxy()
  const { data, refetch, error, isError, isLoading } = useQuery({
    queryKey: ['apiTest', apiId, ...Object.keys(formValues || {})],
    queryFn: () =>
      request({
        formValues,
        apiId,
        headers: {},
      }),
  })

  const resData = get(data, 'data', {})

  const headers: AxiosHeaders = data?.headers as any as AxiosHeaders
  if (isLoading) {
    return null
  }
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
            key: 'body',
            tabKey: 'body',
            label: 'Body',
            children: (
              <ApiTestItemWrap>
                <MonacoEditor
                  {...jsonEditProps}
                  defaultValue={JSON.stringify(resData)}
                />
              </ApiTestItemWrap>
            ),
          },
          {
            key: 'headers',
            tabKey: 'headers',
            label: 'Headers',
            children: (
              <ApiTestItemWrap>
                <MonacoEditor
                  {...jsonEditProps}
                  defaultValue={JSON.stringify(
                    headers && headers.toJSON
                      ? JSON.parse(JSON.stringify(headers.toJSON()))
                      : {},
                  )}
                />
              </ApiTestItemWrap>
            ),
          },
          {
            key: 'status',
            tabKey: 'status',
            label: 'Status',
            children: (
              <ApiTestItemWrap>
                <MonacoEditor
                  {...jsonEditProps}
                  defaultValue={JSON.stringify({
                    status: data?.status,
                    statusText: data?.statusText,
                  })}
                />
              </ApiTestItemWrap>
            ),
          },
        ]}
      />
    </div>
  )
}
