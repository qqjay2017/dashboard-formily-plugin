export function compileApiJs(handlebarsStr = "") {
  if (!handlebarsStr) {
    return null;
  }
  // eslint-disable-next-line no-new-func
  const funCode = new Function(`${handlebarsStr};return option`);
  try {
    const jsArr = funCode();

    return jsArr;
  } catch (error) {
    // 编译接口js报错了
    console.error(error, "编译接口js报错了");
    return null;
  }
}
