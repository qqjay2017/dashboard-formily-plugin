import type { PropsWithChildren } from 'react'
import React, { useMemo, useRef } from 'react'
import { useDesigner } from '../hooks'
import { WorkspaceContext } from '../context'

interface IWorkspaceProps extends PropsWithChildren {
  id?: string
  title?: string
  description?: string
}

export function Workspace({ id, title, description, children }: IWorkspaceProps) {
  const oldId = useRef<string>()
  const designer = useDesigner()
  const workspace = useMemo(() => {
    if (!designer)
      return
    if (oldId.current && oldId.current !== id) {
      const old = designer.workbench.findWorkspaceById(oldId.current)
      if (old)
        old.viewport.detachEvents()
    }
    const workspace = {
      id: id || 'index',
      title,
      description,
    }
    designer.workbench.ensureWorkspace(workspace)
    oldId.current = workspace.id
    return workspace
  }, [id, designer])
  return (
    <WorkspaceContext.Provider value={workspace}>
      {children}
    </WorkspaceContext.Provider>
  )
}
