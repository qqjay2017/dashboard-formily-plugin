export function shortUid(uid: string): string {
  // 检查 UID 长度是否足够
  if (uid.length < 8) {
    return uid
  }

  // 提取前4位和后4位
  const start = uid.slice(0, 4)
  const end = uid.slice(-4)

  // 返回格式化后的 UID
  return `${start}...${end}`
}
