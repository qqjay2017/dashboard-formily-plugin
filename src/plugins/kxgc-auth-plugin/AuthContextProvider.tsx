import type { PropsWithChildren } from 'react'

import { useEffect, useMemo, useState } from 'react'

import type { IAuthingParams } from 'ljcoreauth'
import { Authing } from 'ljcoreauth'
import { SchemaComponentOptions } from '../../schema-component/core'
import { AuthContext } from './AuthContext'

import { localDomainInject } from './localDomainInject'
import { useAppSpin } from '@/application'

export type AuthingParamsType = Partial<IAuthingParams>
export interface IAuthContextProviderPorps extends PropsWithChildren {
  /**
   * 登录组件的属性
   *
   */
  authingParams?: AuthingParamsType
}

export function AuthContextProvider({
  children,
  authingParams,
}: IAuthContextProviderPorps) {
  const appSpin = useAppSpin()
  const manual = authingParams?.manual || false

  const authing = useMemo(() => {
    return new Authing({
      domain: localDomainInject(location.origin),
      //   redirectUri: window.location.origin,
      redirectUri: location.origin + location.pathname,

      ...authingParams,
    })
  }, [authingParams])

  const [isLoading, setIsLoading] = useState(!Authing.getLoginState())
  const [authenticated, setAuthenticated] = useState(Authing.getLoginState())
  const [userInfoFromSession, setUserInfoFromSession] = useState(
    JSON.parse(sessionStorage.getItem('USER_INFO') || '{}'),
  )

  useEffect(() => {
    if (!authing) {
      return
    }

    if (Authing.isRedirectCallback() || (!manual && !Authing.getLoginState())) {
      appSpin.render()
      authing.handleRedirectCallback().then((userInfo) => {
        setIsLoading(!Authing.getLoginState())
        setAuthenticated(Authing.getLoginState())
        userInfo && userInfo.id && setUserInfoFromSession(userInfo)
      })
    }
  }, [manual, authing, Authing, setUserInfoFromSession])

  return (
    <SchemaComponentOptions
      scope={{
        authing,
      }}
    >
      <AuthContext.Provider
        value={{
          authing,
          isLoading,
          setIsLoading,
          authenticated,
          setAuthenticated,
          userInfoFromSession,
          setUserInfoFromSession,
        }}
      >
        {Authing.isRedirectCallback() || (!manual && isLoading)
          ? null
          : children}
      </AuthContext.Provider>
    </SchemaComponentOptions>
  )
}
