import { observable } from '@formily/reactive'
import { MoveableTargetGroupsType } from 'react-moveable'



export const selectedTargetsStore = observable.ref<
    MoveableTargetGroupsType
>(
    []
)
