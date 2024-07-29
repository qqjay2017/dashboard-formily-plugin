import { Button } from 'antd'
import { get } from 'lodash-es'
import { useAPIClient } from '@/api-client'
import { apiBase } from '@/utils'

export function ExportApiBtn() {
  const apiClient = useAPIClient()
  const handleExport = async () => {
    const data = await apiClient.request({
      method: 'post',
      url: `${apiBase}/api-manage/export`,
    })
    const json = get(data, 'data.data', {})
    const link = document.createElement('a')
    link.download = '导出api.json'
    link.href = `data:text/plain,${JSON.stringify(json)}`
    link.click()
  }
  return (
    <Button
      onClick={() => {
        handleExport()
      }}
    >
      导出
    </Button>
  )
}
