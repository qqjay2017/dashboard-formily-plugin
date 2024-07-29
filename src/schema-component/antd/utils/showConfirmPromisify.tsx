import { ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'

const { confirm } = Modal

export function showConfirmPromisify({
  title,
  content,
}: {
  title?: string
  content?: string
}) {
  return new Promise<null>((resolve, reject) => {
    return confirm({
      title: title || '确认删除?',
      icon: <ExclamationCircleFilled />,
      content: content || '是否确认删除',
      onOk() {
        resolve(null)
      },
      onCancel() {
        reject()
      },
    })
  })
}
