import type { HeaderMenuItemType } from '../HeaderMenu/types'

export function loopMenuList(menuList: HeaderMenuItemType[]) {
  const subMenuList = []
  for (const [index, item] of menuList.entries()) {
    if (item.children) {
      for (const child of item.children) {
        subMenuList.push({
          ...child,
          parent: {
            ...item,
            index,
          },
        })
      }
    }
    else {
      subMenuList.push({
        ...item,
        parent: {
          ...item,
          index,
          children: [item],
        },
      })
    }
  }
  return subMenuList
}
