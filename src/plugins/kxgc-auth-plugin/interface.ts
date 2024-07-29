import type { Authing } from 'ljcoreauth'
import type React from 'react'

export interface UserInfoFromSession {
  id: string
  loginName: string
  name: string
  code: string
  mobile: string
  antUserDid: string
  defaultCompId: string
  companyName: string
  antCompanyDid: string
  employeeId: string
}

export interface IAuthProvider {
  authing: Authing | null
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  authenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>

  userInfoFromSession: UserInfoFromSession
  setUserInfoFromSession: any
}
