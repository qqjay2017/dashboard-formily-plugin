import { connect } from '@formily/react'
import { ProjectAttendanceDataAna } from './ProjectAttendanceDataAna'
import type { DnFC } from '@/designable/react'
import { createBehavior, createResource } from '@/designable/core'
import { rs } from '@/utils'
import { createFieldSchema } from '@/designable/Field'

export const FormilyProjectAttendanceDataAna: DnFC<any> = connect(
  ProjectAttendanceDataAna,
)

FormilyProjectAttendanceDataAna.Resource = createResource({
  title: '项目考勤数据分析',

  icon: rs('/dashboard-assets/personInfoMng/WX20240702-224434@2x.png'),

  elements: [
    {
      componentName: 'Field',
      props: {
        'type': 'void',
        'x-component': 'ProjectAttendanceDataAna',
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
FormilyProjectAttendanceDataAna.Behavior = createBehavior({
  name: 'ProjectAttendanceDataAna',
  selector: node =>
    node.componentName === 'Field'
    && node.props['x-component'] === 'ProjectAttendanceDataAna',
  designerProps: {
    title: '项目考勤数据分析',
    draggable: true,
    droppable: false,
    resizable: {},
    translatable: {},
    propsSchema: createFieldSchema({}),
  },
})
