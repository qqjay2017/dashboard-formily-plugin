import loader from '@monaco-editor/loader'
import { BASE_URL } from '@/utils/env'

const Registry = {
  cdn: `${window.origin}${BASE_URL}npm`,
}

export function setNpmCDNRegistry(registry: string) {
  Registry.cdn = registry
  loader.config({
    paths: {
      vs: `${registry}/monaco-editor@0.30.1/min/vs`,
    },
  })
}

export const getNpmCDNRegistry = () => String(Registry.cdn).replace(/\/$/, '')
