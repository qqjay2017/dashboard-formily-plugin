import { Button, Input } from 'antd'
import { nanoid } from 'nanoid'
import { css } from '@emotion/css'
import { RiFormula } from 'react-icons/ri'
import { DeleteOutlined } from '@ant-design/icons'
import type { FormItemComponentProps } from '@/types'

interface ApiHeadersFormItemProps extends FormItemComponentProps {}

export function ApiHeadersFormItem({
  value = [],
  onChange,
}: ApiHeadersFormItemProps) {
  return (
    <div>
      <div>
        {value.map((item, index) => {
          return (
            <div
              key={item.id}
              className={css`
                display: flex;
                align-items: center;
                margin-bottom: 12px;
              `}
            >
              <Input
                className={css`
                  width: 250px;
                  margin-right: 16px;
                `}
                value={item.headerKey}
                placeholder="字段名"
                onChange={(e) => {
                  onChange
                  && onChange(
                    value.map((vItem) => {
                      if (vItem.id === item.id) {
                        return {
                          ...vItem,
                          headerKey: e.target.value,
                        }
                      }
                      return vItem
                    }),
                  )
                }}
              />
              <Input
                className={css`
                  width: 250px;
                  margin-right: 16px;
                `}
                value={item.headerValue}
                placeholder="值"
                addonAfter={<RiFormula />}
                onChange={(e) => {
                  onChange
                  && onChange(
                    value.map((vItem) => {
                      if (vItem.id === item.id) {
                        return {
                          ...vItem,
                          headerValue: e.target.value,
                        }
                      }
                      return vItem
                    }),
                  )
                }}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => {
                  onChange
                  && onChange(
                    value.filter((vItem) => {
                      if (vItem.id === item.id) {
                        return false
                      }
                      return true
                    }),
                  )
                }}
              >
              </Button>
            </div>
          )
        })}
      </div>
      <div
        className={css`
          margin-top: ${value.length ? '16px' : '0px'};
        `}
      >
        <Button
          type="primary"
          onClick={() => {
            onChange
            && onChange([
              ...value,
              {
                id: nanoid(),
                headerKey: '',
                headerValue: '',
              },
            ])
          }}
        >
          添加字段
        </Button>
      </div>
    </div>
  )
}
