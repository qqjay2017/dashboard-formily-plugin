

export const eidToElementId = (eid = "") => {
    return eid.replace(/\./g, '-')
}


export const elementIdToEid = (eid = "") => {
    return eid.replace(/-/g, '.')
}
