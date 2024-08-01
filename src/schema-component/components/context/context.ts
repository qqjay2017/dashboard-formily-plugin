import { createContext, useContext } from 'react'

export const defaultDesignZoom = 0.5

export interface DesignPageConextValue {
  designZoom: number
  setDesignZoom: React.Dispatch<React.SetStateAction<number>>
}

export const DesignPageConext = createContext<DesignPageConextValue>(null)

export function useDesignPageConext() {
  return useContext(DesignPageConext)
    || ({
      designZoom: 1,
    } as DesignPageConextValue)
}
