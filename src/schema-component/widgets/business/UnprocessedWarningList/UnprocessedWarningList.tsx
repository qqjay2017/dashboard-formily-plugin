import React from 'react'
import { css } from '@emotion/css'
import { get } from 'lodash-es'
import { getSchemeWrap } from './getSchemeWrap'
import { menuItem } from './menuItem'
import { settingSchema } from './settingSchema'
import type { UnprocessedWarningItem } from './types'
import { WarnListItem } from './WarnListItem'
import type { SchemComponentWithDataSourceProps } from '@/types'
import {
  useDataBindFetch,
  useQueryToBusParams,
} from '@/schema-component/hooks'
import { EmptyKit } from '@/style-components'

export function UnprocessedWarningList({
  query,
  dataSource,
}: SchemComponentWithDataSourceProps) {
  const busParams = useQueryToBusParams(query)
  const { data, isLoading } = useDataBindFetch(dataSource, busParams)
  const warnList: UnprocessedWarningItem[] = get(data, 'data.data', []) || []
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
      `}
    >
      <div
        className={css`
          font-size: 0.12rem;
          color: #ffd059;
          line-height: 0.12rem;
        `}
      >
        {`未处理预警共计  ${warnList.length}  条`}
      </div>
      <div
        className={css`
          width: 100%;
          height: calc(100% - 0.28rem);
          background: rgba(67, 110, 189, 0.1);
          overflow: hidden;
          padding: 0.15rem 0.24rem 0.12rem 0.24rem;
          margin-top: 0.16rem;
        `}
      >
        <EmptyKit loading={isLoading} empty={!warnList.length}>
          <div
            className={css`
              width: 100%;
              min-height: 100%;
              overflow: hidden auto;
            `}
          >
            {warnList.map((w, index) => {
              return <WarnListItem key={index} {...w} />
            })}
          </div>
        </EmptyKit>
      </div>
    </div>
  )
}

UnprocessedWarningList.displayName = 'UnprocessedWarningList'
UnprocessedWarningList.schemaFn = getSchemeWrap
UnprocessedWarningList.menuItem = menuItem
UnprocessedWarningList.settingSchema = settingSchema
