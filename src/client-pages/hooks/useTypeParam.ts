import React, { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useTypeParam(defaultValue = '') {
    const [searchParams, setSearchParams] = useSearchParams()
    return {
        typeParam: searchParams.get('type') || defaultValue,
        setTypeParam: useCallback((type = '') => {
            return setSearchParams(prev => ({
                ...prev,
                type,
            }))
        }, []),

    }
}
