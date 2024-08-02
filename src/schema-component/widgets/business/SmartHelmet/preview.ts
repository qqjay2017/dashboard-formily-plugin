import { connect } from '@formily/react'
import { SmartHelmet } from './SmartHelmet'
import type { DnFC } from '@/designable/react'
import { createBehavior, createResource } from '@/designable/core'
import { rs } from '@/utils'
import { createFieldSchema } from '@/designable/Field'

export const FormilySmartHelmet: DnFC<any> = connect(SmartHelmet)

FormilySmartHelmet.Resource = createResource({
  title: '智能安全帽',

  icon: rs('/dashboard-assets/schema-component/SmartHelmet/WX20240721-150257@2x.png'),

  elements: [
    {
      componentName: 'Field',
      props: {
        'type': 'void',
        'x-component': 'SmartHelmet',
        'x-decorator': 'PositionDecorator',
        'x-decorator-props': {
          padding: '16px 16px 16px 16px',
          w: 3,
          h: 3,
        },

      },
    },
  ],
})
FormilySmartHelmet.Behavior = createBehavior({
  name: 'SmartHelmet',
  selector: node =>
    node.componentName === 'Field'
    && node.props['x-component'] === 'SmartHelmet',
  designerProps: {
    title: '智能安全帽',
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
})
