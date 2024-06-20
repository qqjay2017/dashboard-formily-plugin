

export const dispatchInsert = () => {
    return document.dispatchEvent(new CustomEvent("onInsert"));
}


export const dispatchFieldSchemaChange = () => {
    return document.dispatchEvent(new CustomEvent("dispatchFieldSchemaChange"));
}
