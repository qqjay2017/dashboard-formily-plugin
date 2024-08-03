export function compileApiJs(handlebarsStr = "") {
  if (!handlebarsStr) {
    return null;
  }
  // eslint-disable-next-line no-new-func
  const funCode = new Function(`option=null;${handlebarsStr};return option`);
  try {
    return funCode();
  } catch (error) {
    // 编译接口js报错了
    return null;
  }
}
