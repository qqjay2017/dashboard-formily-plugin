export function getType(obj: any) {
  return Object.prototype.toString.call(obj)
}
function isType<T>(type: string | string[]) {
  return (obj: unknown): obj is T =>
    obj != null
    && (Array.isArray(type) ? type : [type]).some(
      t => getType(obj) === `[object ${t}]`,
    )
}
export const isFn = isType<(...args: any[]) => any>([
  'Function',
  'AsyncFunction',
  'GeneratorFunction',
])
export const isWindow = isType<Window>('Window')
export function isHTMLElement(obj: any): obj is HTMLElement {
  return obj?.nodeName || obj?.tagName
}
export const isArr = Array.isArray
export const isPlainObj = isType<object>('Object')
export const isStr = isType<string>('String')
export const isBool = isType<boolean>('Boolean')
export const isNum = isType<number>('Number')
export const isObj = (val: unknown): val is object => typeof val === 'object'
export const isRegExp = isType<RegExp>('RegExp')
export const isValid = (val: any) => val !== null && val !== undefined
export function isValidNumber(val: any): val is number {
  return !Number.isNaN(val) && isNum(val)
}
