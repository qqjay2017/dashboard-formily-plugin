import { Select } from 'antd'
import React from 'react'
import type { FormItemComponentProps } from '@/types'

export function DesignWidthEnumSelect(props: FormItemComponentProps) {
  return (
    <Select
      {...props}
      options={[
        {
          label: '1024 * 768',
          value: '1024',
        },
        {
          label: '1920 * 1080',
          value: '1920',
        },
        {
          label: '3840 * 1080',
          value: '3840',
        },
      ]}
    />
  )
}
