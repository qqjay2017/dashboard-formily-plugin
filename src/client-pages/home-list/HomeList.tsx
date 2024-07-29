import { get } from 'lodash-es'

import { Button, Col, Dropdown, Row, message } from 'antd'
import { css } from '@emotion/css'
import { IoIosMore } from 'react-icons/io'

import { useNavigate } from 'react-router-dom'
import { FormDialog, Input } from '@formily/antd-v5'
import { useAPIClient, useRequest } from '../../api-client/hooks'
import type { APiWrap } from '../../api-client/hooks'
import type { DashboardItem } from '../dashboard/types'

import {
  FormDialogPortal,
  showConfirmPromisify,
  useFormDialog,
} from '../../schema-component/antd'
import { updateDashboardFormSchema } from '../dashboard/schema/createDashboardFormSchema'
import { useApp } from '@/application'
import { useReportShare } from '@/hooks'
import { apiBase, copyTextToClipboard } from '@/utils'

export function HomeList() {
  const { data, refetch } = useRequest<APiWrap<DashboardItem[]>>(
    `${apiBase}/dashboard`,
    {
      method: 'GET',
    },
  )

  const list = get(data, 'data.data', []) || []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Row gutter={16}>
        {list.map(dashboard => (
          <Col className="gutter-row" key={dashboard.id} span={6}>
            <FormCard dashboard={dashboard} refetch={refetch}></FormCard>
          </Col>
        ))}
      </Row>
    </div>
  )
}

function FormCard({
  dashboard,
  refetch,
}: {
  dashboard: DashboardItem
  refetch: Function
}) {
  const navigate = useNavigate()
  const apiClient = useAPIClient()
  const app = useApp()
  const { reportShare } = useReportShare()
  const { getFormDialog } = useFormDialog()
  return (
    <div
      className={css`
        margin: 16px;
      `}
    >
      <div
        className={css`
          width: 272px;
          height: 207px;
          border: 1px solid #e9ecf1;
          background-color: #fff;
          box-sizing: border-box;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          &:hover {
            box-shadow: 0 6px 18px #1d293924;
          }
        `}
      >
        <div
          onClick={() => {
            navigate(`/dashboard-design/${dashboard.id}`)
          }}
          className={css`
            width: 100%;
            height: 151px;
            background: #f5f5f5;
            background-image: url(${dashboard.coverThumbnail});
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center center;
          `}
        >
        </div>
        <div
          className={css`
            width: 100%;
            height: 56px;
            padding: 11px 12px 11px 16px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            justify-content: space-between;
            border-top: 1px solid #e9ecf1;
          `}
        >
          <div
            className={css`
              flex: 1;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            `}
          >
            {dashboard.name}
          </div>
          <FormDialogPortal>
            <Dropdown
              trigger={['click']}
              menu={{
                onClick: async ({ key }) => {
                  if (key === 'share') {
                    const url = `${window.location.origin}/dashboard-report/${dashboard.shareURL}`
                    const dialog = FormDialog(
                      {
                        title: '分享链接',

                        footer: null,
                      },
                      () => {
                        return (
                          <div>
                            <Input.TextArea value={url} disabled />
                            <Button
                              block
                              type="primary"
                              style={{
                                marginTop: '16px',
                              }}
                              onClick={() => {
                                copyTextToClipboard(url)
                              }}
                            >
                              复制链接
                            </Button>
                          </div>
                        )
                      },
                    )
                    dialog.open()
                    return
                  }
                  if (key === 'delete') {
                    await showConfirmPromisify({})
                    await apiClient.request({
                      url: `${apiBase}/dashboard/${dashboard.id}`,
                      method: 'delete',
                    })
                    refetch && refetch()
                    return
                  }
                  if (key === 'preview') {
                    return reportShare(dashboard.shareURL, {
                      isHref: false,
                    })
                  }
                  if (key === 'edit') {
                    const dialog = getFormDialog(
                      {
                        title: '新建',
                      },
                      updateDashboardFormSchema,
                    )
                    dialog
                      .forOpen((payload, next) => {
                        next({
                          initialValues: {
                            name: dashboard.name,
                            description: dashboard.description,
                          },
                        })
                      })
                      .forConfirm(async (payload, next) => {
                        const { name, description } = payload.values
                        await app.apiClient.request<
                          any,
                          APiWrap<{ id: number }>
                        >({
                          url: `${apiBase}/dashboard/${dashboard.id}`,
                          method: 'PUT',
                          data: {
                            name,
                            description,
                          },
                        })
                        message.success('修改成功')
                        refetch && refetch()
                        next(payload)
                      })
                      .open()
                  }
                },
                items: [
                  {
                    key: 'preview',
                    label: '预览',
                  },
                  {
                    key: 'share',
                    label: '分享',
                  },
                  {
                    key: 'edit',
                    label: '编辑',
                  },
                  {
                    key: 'delete',
                    label: '删除',
                  },
                ],
              }}
            >
              <IoIosMore />
            </Dropdown>
          </FormDialogPortal>
        </div>
      </div>
    </div>
  )
}
