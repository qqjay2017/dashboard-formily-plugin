export interface HeaderMenuItemType {
  label: string
  shareURL: string
  disabled?: boolean
  children?: HeaderMenuItemType[]
}
