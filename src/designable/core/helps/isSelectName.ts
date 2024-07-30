export function isSelectName(name = '') {
  return name && name.includes && name.includes('Select')
}

export function isNeedQueryInject(name = '') {
  return name && name.includes && !name.includes('Select') && !name.includes('DashboardRoot')
}
