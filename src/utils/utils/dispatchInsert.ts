export function dispatchInsert() {
  return document.dispatchEvent(new CustomEvent('onInsert'))
}

export function dispatchFieldSchemaChange() {
  return document.dispatchEvent(new CustomEvent('dispatchFieldSchemaChange'))
}
