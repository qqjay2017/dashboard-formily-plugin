import { Button } from 'antd'
import { fileOpen } from 'browser-fs-access'
import { useAPIClient } from '@/api-client'
import { apiBase } from '@/utils'

import { useApp } from '@/application'
import { showConfirmPromisify } from '@/schema-component'

export function ImportApiBtn() {
  const app = useApp()
  const apiClient = useAPIClient()
  const handleImport = async () => {
    const blob = await fileOpen({
      extensions: ['.json'],
      // mimeTypes: ["application/json"],
    })
    if (!blob) {
      return false
    }

    const reader = new FileReader()
    const fileContentPromise = new Promise((resolve, reject) => {
      reader.onload = () => {
        // 读取完成时解析JSON字符串
        const jsonString = reader.result
        resolve(jsonString as unknown as string)
      }

      reader.onerror = () => {
        reject(new Error('Failed to read file'))
      }
    })
    reader.readAsText(blob)
    const jsonString: any = await fileContentPromise
    const jsonObject = JSON.parse(jsonString || '{}')
    await showConfirmPromisify({
      title: '确认导入?',
      content: '文件解析成功,是否确认导入',
    })

    await apiClient.request({
      method: 'post',
      url: `${apiBase}/api-manage/import`,
      data: jsonObject,
    })

    app.message.success('导入成功')
    document.dispatchEvent(new CustomEvent('importApi'))
  }
  return (
    <Button
      onClick={() => {
        handleImport()
      }}
    >
      导入
    </Button>
  )
}
