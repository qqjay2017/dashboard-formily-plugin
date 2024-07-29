export function getCompanyId(): string | undefined {
  const userInfoObj = JSON.parse(sessionStorage.getItem('USER_INFO') || '{}')

  return userInfoObj.defaultCompId || ''
}

export interface IScmUserInfo {
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
  employeeName: string
  oauthSource?: any
  userOauthId?: any
}
export function getScmUserInfo(): Partial<IScmUserInfo> {
  const userInfoObj = JSON.parse(sessionStorage.getItem('USER_INFO') || '{}')
  return userInfoObj
}
