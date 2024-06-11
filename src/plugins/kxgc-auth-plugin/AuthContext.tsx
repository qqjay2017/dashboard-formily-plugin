import { createContext } from 'react'
import type { IAuthProvider } from './interface'

export const AuthContext = createContext<IAuthProvider | null>(null)

AuthContext.displayName = 'AuthContext'
