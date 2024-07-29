declare global {
  interface Window {
    API_URL_KXGC: string
  }
}

export function localDomainInject(path = '') {
  const isLocal
    = window.location.hostname === 'localhost'
    || window.location.hostname === '127.0.0.1'
  if (isLocal) {
    return window.API_URL_KXGC || 'http://qzjg.kxgcc.com:30251'
  }
  else {
    return path
  }
}
