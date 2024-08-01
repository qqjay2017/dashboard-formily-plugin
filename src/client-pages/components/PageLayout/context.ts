import type { ReactNode } from 'react'
import { createContext } from 'react'

export interface IPageLayoutContextProps {
    menuCollapsed: boolean
    setMenuCollapsed: React.Dispatch<React.SetStateAction<boolean>>
    title?: ReactNode | undefined

    isMobile?: boolean
    siderWidth?: number
    hasSiderMenu?: boolean
    hasFooterToolbar?: boolean
    setHasFooterToolbar?: React.Dispatch<React.SetStateAction<boolean>>

}

export const PageLayoutContext = createContext<IPageLayoutContextProps | null>(null)
