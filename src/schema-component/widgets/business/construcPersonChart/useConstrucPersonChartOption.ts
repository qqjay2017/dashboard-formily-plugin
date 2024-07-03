import React, { useMemo } from 'react'
import { getOption } from './getOption'
import { useToken } from '@/style'

export const useConstrucPersonChartOption = (constructionParticipant = []) => {
    const { token } = useToken()
    return useMemo(() => {
        return getOption(constructionParticipant, {
            token
        })
    }, [JSON.stringify(constructionParticipant), token.colorTextSecondLabel])
}
