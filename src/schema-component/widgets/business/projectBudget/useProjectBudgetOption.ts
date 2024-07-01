import React, { useMemo } from 'react'
import { FeeListItem, getPieOption } from './getPieOption'
import { useToken } from '@/style';

export const useProjectBudgetOption = (feeList: FeeListItem[]) => {
    const { token } = useToken();

    return useMemo(() => {
        return getPieOption({
            feeList,
            chartColors: token.chartColors
        });
    }, [feeList.length]);
}
