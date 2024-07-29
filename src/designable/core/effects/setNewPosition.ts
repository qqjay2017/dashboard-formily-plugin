import React from 'react'
import { set } from 'lodash-es'
import type { TreeNode } from '../models'
import { sizeFormat } from '@/utils'

export function setNewPosition(dragNodes: TreeNode[] = [], { width = 1920, height = 1080 }) {
    dragNodes.forEach((node) => {
        if (!node || !node.getElementOffsetRect) {
            return
        }
        const rect = node.getElementOffsetRect()
        if (!rect) {
            return false
        }

        const colWidth = width / 12
        const rowHeight = height / 12

        const newPosition = {
            ...node.props?.['x-decorator-props'],
            x: sizeFormat(rect.x / colWidth, 2),
            y: sizeFormat(rect.y / rowHeight, 2),
            w: sizeFormat(rect.width / colWidth, 2),
            h: sizeFormat(rect.height / rowHeight, 2),
        }
        set(node, 'props.x-decorator-props', newPosition)
    })
}
