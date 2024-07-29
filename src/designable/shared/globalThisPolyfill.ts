// @ts-nocheck
function getGlobalThis() {
  try {
    // eslint-disable-next-line no-restricted-globals
    if (typeof self !== 'undefined') {
      // eslint-disable-next-line no-restricted-globals
      return self
    }
  }
  catch (e) {}
  try {
    // eslint-disable-next-line ts/no-use-before-define
    if (typeof globalThisPolyfill !== 'undefined') {
      // eslint-disable-next-line ts/no-use-before-define
      return globalThisPolyfill
    }
  }
  catch (e) {}
  try {
    // eslint-disable-next-line no-restricted-globals
    if (typeof global !== 'undefined') {
      // eslint-disable-next-line no-restricted-globals
      return global
    }
  }
  catch (e) {}
  // eslint-disable-next-line no-new-func
  return Function('return this')()
}
export const globalThisPolyfill: Window = getGlobalThis()
