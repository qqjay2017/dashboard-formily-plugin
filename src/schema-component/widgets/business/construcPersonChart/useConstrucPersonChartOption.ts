import React, { useMemo } from 'react'
import { getOption } from './getOption'

export const useConstrucPersonChartOption = (constructionParticipant = []) => {
    return useMemo(() => {
        return getOption(constructionParticipant)
    }, [constructionParticipant?.length])
}
