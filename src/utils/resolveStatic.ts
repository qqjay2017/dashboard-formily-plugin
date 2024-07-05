

export const resolveStatic = (path = '') => {
    return `${import.meta.env.BASE_URL}/${path}`
    // if (import.meta.env.PROD) {

    // }
    // return path
}
export const rs = resolveStatic
