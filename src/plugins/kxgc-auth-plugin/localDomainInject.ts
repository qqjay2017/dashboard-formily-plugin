
declare global {
    interface Window {
        API_URL_KXGC: string;
    }
}


export const localDomainInject = (path = '') => {
    const isLocal = window.location.hostname === 'localhost'
    if (isLocal) {
        return window.API_URL_KXGC || 'https://uat.kxgcc.com'
    } else {
        return path
    }
}
