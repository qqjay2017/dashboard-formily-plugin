import { Spin } from 'antd'
import React from 'react'
import { useApp } from './useApp'

export function useAppSpin() {
  const app = useApp()
  return {
    render: () => (app?.renderComponent ? app?.renderComponent?.('AppSpin') : React.createElement(Spin)),
  }
}
