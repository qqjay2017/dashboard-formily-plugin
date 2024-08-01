import { createContext } from 'react'

interface IPageLayoutContextProps {
    menuCollapsed: boolean
    setMenuCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export const PageLayoutContext = createContext<IPageLayoutContextProps | null>(null)
