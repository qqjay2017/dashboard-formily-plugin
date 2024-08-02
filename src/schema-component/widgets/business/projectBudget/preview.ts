import { connect } from '@formily/react'
import { ProjectBudget } from './ProjectBudget'
import type { DnFC } from '@/designable/react'
import { createBehavior, createResource } from '@/designable/core'
import { rs } from '@/utils'
import { createFieldSchema } from '@/designable/Field'

export const FormilyProjectBudget: DnFC<any> = connect(ProjectBudget)

FormilyProjectBudget.Resource = createResource({
  title: '项目预算',

  icon: rs('/dashboard-assets/project-budget/WX20240627-233711@2x.png'),

  elements: [
    {
      componentName: 'Field',
      props: {
        'type': 'void',
        'x-component': 'ProjectBudget',
        'x-decorator': 'PositionDecorator',
        'x-decorator-props': {
          padding: '12px 12px 12px 12px',
          w: 3,
          h: 3,
        },

      },
    },
  ],
})
FormilyProjectBudget.Behavior = createBehavior({
  name: 'ProjectBudget',
  selector: node =>
    node.componentName === 'Field'
    && node.props['x-component'] === 'ProjectBudget',
  designerProps: {
    title: '项目预算',
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
})
