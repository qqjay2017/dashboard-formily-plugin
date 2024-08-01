import React, { useContext } from 'react'
import { PageLayoutContext } from './context'

export function usePageLayoutContext() {
    const ctx = useContext(PageLayoutContext)
    if (!ctx) {
        throw new Error('call PageLayoutContext must in PageLayout')
    }
    return ctx
}
