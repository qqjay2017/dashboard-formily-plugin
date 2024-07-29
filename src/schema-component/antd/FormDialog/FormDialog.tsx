import type { IModalProps } from '@formily/antd-v5'
import { FormDialog as AntdFormDialog, FormLayout } from '@formily/antd-v5'

import type { ISchema } from '@formily/react'
import { SchemaOptionsContext } from '@formily/react'

import { useContext } from 'react'
import { SchemaField2 } from '@/schema-component'

export function useFormDialog() {
  const options = useContext(SchemaOptionsContext)
  const getFormDialog = (modalProps: IModalProps, schema: ISchema) =>
    AntdFormDialog(modalProps, () => {
      return (
        <FormLayout labelCol={6} wrapperCol={18}>
          <SchemaField2
            components={options?.components}
            scope={options?.scope}
            schema={schema}
          />
        </FormLayout>
      )
    })
  return {
    getFormDialog,
  }
}
