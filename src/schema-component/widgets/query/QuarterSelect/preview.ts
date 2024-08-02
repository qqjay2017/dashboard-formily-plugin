import { connect } from '@formily/react'
import { QuarterSelect } from './QuarterSelect'
import type { DnFC } from '@/designable/react'
import { createBehavior, createResource } from '@/designable/core'
import { rs } from '@/utils'
import { createFieldSchema } from '@/designable/Field'

export const FormilyQuarterSelect: DnFC<any> = connect(QuarterSelect)

FormilyQuarterSelect.Resource = createResource({
  title: '季度查询',

  icon: rs('/dashboard-assets/query/WX20240703-230554@2x.png'),
  elements: [
    {
      componentName: 'Field',
      props: {
        'type': 'void',

        'x-component': 'QuarterSelect',
        'x-decorator': 'PositionDecorator',
        'x-decorator-props': {
          padding: '0px 0px 0px 0px',
          w: 1.5,
          h: 0.5,
        },
      },
    },
  ],
})
FormilyQuarterSelect.Behavior = createBehavior({
  name: 'QuarterSelect',
  selector: node =>
    node.componentName === 'Field'
    && node.props['x-component'] === 'QuarterSelect',
  designerProps: {
    title: '季度查询',
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({
      queryType: {
        'type': 'string',
        'title': '查询类型',
        'required': false,
        'x-decorator': 'FormItem',
      },
      defaultCurrentQuarter: {
        'type': 'boolearn',
        'title': '默认选中本季度',
        'required': false,
        'default': true,
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    }),
  },
})
