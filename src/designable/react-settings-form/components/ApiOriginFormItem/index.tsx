import { css } from '@emotion/css'
import { Button, Select } from 'antd'
import { get } from 'lodash-es'
import type { ISchema } from '@formily/react'
import type { APiWrap } from '@/api-client'
import { useAPIClient, useQuery } from '@/api-client'

import type { FormItemComponentProps } from '@/types'
import { apiBase } from '@/utils'
import { useFormDialog } from '@/schema-component/antd'

const createApiOriginSchema: ISchema = {
  type: 'object',
  properties: {
    origin: {
      'type': 'string',
      'title': 'api域名',
      'required': true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-validator': {
        type: 'string',
        pattern: '^http(?!/).*$',
        message: '以http开头,不以/结尾',
      },
    },
  },
}

interface ApiOriginFormItemProps extends FormItemComponentProps {}
export function ApiOriginFormItem({
  value,
  onChange,
  onBlur,
}: ApiOriginFormItemProps) {
  const apiClient = useAPIClient()

  const { data, refetch } = useQuery<any, APiWrap<{}[]>>({
    queryKey: ['getApiOrigin'],
    queryFn: () =>
      apiClient.request({
        url: `${apiBase}/api-manage/origin/list`,
        method: 'get',
      }),
  })

  const options = (get(data, 'data.data', []) || []).map((item) => {
    return {
      ...item,
      label: item.origin,
      value: item.origin,
    }
  })

  const { getFormDialog } = useFormDialog()

  return (
    <div>
      <div
        className={css`
          margin-bottom: 16px;
        `}
      >
        <Select
          allowClear
          options={options}
          value={value}
          onChange={(e) => {
            onChange && onChange(e || null)
          }}
          onBlur={onBlur}
        />
      </div>
      <div>
        <Button
          type="primary"
          onClick={async () => {
            const dialog = getFormDialog(
              {
                title: '新建域名',
              },
              createApiOriginSchema,
            )
            dialog
              .forOpen((payload, next) => {
                next({
                  initialValues: {},
                })
              })
              .forConfirm(async (payload, next) => {
                const { origin } = payload.values
                const res = await apiClient.request<
                  any,
                  APiWrap<{ id: number }>
                >({
                  url: `${apiBase}/api-manage/origin`,
                  method: 'POST',
                  data: {
                    origin: (origin || '').trim(),
                  },
                })

                const id = get(res, 'data.data.id')
                if (id) {
                  refetch()
                  return next(payload)
                }
                else {
                  return Promise.reject()
                }
              })
              .open()
          }}
        >
          新建域名
        </Button>
      </div>
    </div>
  )
}
