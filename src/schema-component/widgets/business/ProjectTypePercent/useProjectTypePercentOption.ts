import { useMemo } from 'react'
import { getPieOption } from './getPieOption';
import { useToken } from '@/style';

export const useProjectTypePercentOption = (list = [], activeIndex) => {
    const { token } = useToken()

    return useMemo(() => getPieOption({
        list,
        activeIndex,
        chartColors: token.chartColors
    }), [activeIndex, list.length])
}
