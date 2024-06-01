import { useContext } from 'react'
import { DashboardRootContext } from '../context'


export const useDashboardRoot = () => {
    const ctx = useContext(DashboardRootContext)
    if (!ctx) {
        throw new Error("must in DashboardRootRendererContext")
    }
    return ctx
}
