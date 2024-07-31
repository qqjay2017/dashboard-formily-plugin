import type React from 'react'
import type { Form } from '@formily/core'
import type { PropsWithChildren } from 'react'

export interface ISettingFormProps extends PropsWithChildren {
  className?: string
  style?: React.CSSProperties
  uploadAction?: string
  components?: Record<string, React.FC<any>>
  effects?: (form: Form) => void
  scope?: any
  form?: Form
}
