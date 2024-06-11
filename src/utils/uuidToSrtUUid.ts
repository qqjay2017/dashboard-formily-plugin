

export const uuidToSrtUUid = (uuid = '') => {
    return uuid.slice(0, 4) + '...' + uuid.slice(-4);
}
