export function uuidToSrtUUid(uuid = '') {
  return `${uuid.slice(0, 4)}...${uuid.slice(-4)}`
}
