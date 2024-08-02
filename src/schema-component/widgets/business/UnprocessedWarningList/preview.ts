import { connect } from '@formily/react'
import { UnprocessedWarningList } from './UnprocessedWarningList'
import type { DnFC } from '@/designable/react'
import { createBehavior, createResource } from '@/designable/core'
import { rs } from '@/utils'
import { createFieldSchema } from '@/designable/Field'

export const FormilyUnprocessedWarningList: DnFC<any> = connect(
  UnprocessedWarningList,
)

FormilyUnprocessedWarningList.Resource = createResource({
  title: '未处理预警列表',
  icon: rs(
    '/dashboard-assets/schema-component/UnprocessedWarningList/WX20240721-143705@2x.png',
  ),
  elements: [
    {
      componentName: 'Field',
      props: {
        'type': 'void',
        'x-component': 'UnprocessedWarningList',
        'x-decorator': 'PositionDecorator',
        'x-decorator-props': {
          padding: '24px 24px 24px 24px',
          w: 3,
          h: 3,
        },

      },
    },
  ],
})
FormilyUnprocessedWarningList.Behavior = createBehavior({
  name: 'UnprocessedWarningList',
  selector: node =>
    node.componentName === 'Field'
    && node.props['x-component'] === 'UnprocessedWarningList',
  designerProps: {
    title: '项目简介',
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
})
