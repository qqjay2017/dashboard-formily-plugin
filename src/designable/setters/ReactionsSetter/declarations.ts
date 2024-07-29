import { getNpmCDNRegistry } from '@/designable/react-settings-form'

export interface IDependency {
  name: string
  path: string
}

async function loadDependencies(deps: IDependency[]) {
  return Promise.all(
    deps.map(async ({ name, path }) => ({
      name,
      path,
      library: await fetch(`${getNpmCDNRegistry()}/${name}/${path}`).then(
        res => res.text(),
      ),
    })),
  )
}

export function initDeclaration() {
  return Promise.resolve()
}
