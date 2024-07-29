import { css } from '@emotion/css'
import { ConfigProvider } from 'antd'
import type { PropsWithChildren } from 'react'
import React, { useContext } from 'react'
import { FormSubmitBtnWrap } from './FormSubmitBtnWrap'

interface FormContainerProps extends PropsWithChildren {
  btns?: React.ReactElement[]
}
export function FormContainer({ children, btns }: FormContainerProps) {
  const { locale } = useContext(ConfigProvider.ConfigContext)

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        background-color: rgb(35, 35, 36);
      `}
    >
      <ConfigProvider locale={locale}>
        <div
          className={css`
            padding: 10px;
            height: calc(100% - 56px);
            overflow-x: hidden;
            overflow-y: auto;
          `}
        >
          {children}
        </div>

        <div
          className={css`
            height: 56px;
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            /* display: flex; */
            /* align-items: center; */
            /* justify-content: flex-end; */
          `}
        >
          <FormSubmitBtnWrap>{btns}</FormSubmitBtnWrap>
        </div>
      </ConfigProvider>
    </div>
  )
}
