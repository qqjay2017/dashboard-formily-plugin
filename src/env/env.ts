export const NODE_ENV
    = process.env.NODE_ENV === 'production' ? 'production' : 'development'
export const isProduct = NODE_ENV === 'production'

export const BASE_URL = process.env.BASE_URL || '/'
