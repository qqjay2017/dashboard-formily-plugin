import { useContext } from 'react'
import { DesignerLayoutContext } from '../context'
import { IDesignerLayoutContext } from '../types'
import { globalThisPolyfill } from 'designableshared'

export const useLayout = (): IDesignerLayoutContext => {
  return (
    globalThisPolyfill['__DESIGNABLE_LAYOUT__'] ||
    useContext(DesignerLayoutContext)
  )
}

