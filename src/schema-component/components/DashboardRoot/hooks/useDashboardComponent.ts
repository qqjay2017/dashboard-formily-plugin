import { useContext } from 'react'
import { DashboardComponentContext } from '../context'


export const useDashboardComponent = () => {
    const ctx = useContext(DashboardComponentContext)
    if (!ctx) {
        throw new Error("useDashboardComponent  must in DashboardRootRendererContext")
    }
    return ctx
}
