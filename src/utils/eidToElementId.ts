export function eidToElementId(eid = '') {
  return eid.replace(/\./g, '-')
}

export function elementIdToEid(eid = '') {
  return eid.replace(/-/g, '.')
}
