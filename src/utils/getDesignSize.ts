export function getDesignSize(sizeEnum: '1920' | '1024' | '3840') {
  if (sizeEnum === '1024') {
    return {
      designWidth: 1024,
      designHeight: 768,
    }
  }
  if (sizeEnum === '3840') {
    return {
      designWidth: 3840,
      designHeight: 1080,
    }
  }
  return {
    designWidth: 1920,
    designHeight: 1080,
  }
}
