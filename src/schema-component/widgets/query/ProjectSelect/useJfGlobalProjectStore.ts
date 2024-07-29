import dayjs from 'dayjs'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import type { QuarterItemType } from '../QuarterSelect'

dayjs.extend(quarterOfYear)
interface ProjectState {
  projectId: string
  projectName: string
  projectCode: string
  project?: any | null
  quarter: QuarterItemType
  setQuarter: (qua: QuarterItemType) => void
  setProject: (pro: any) => void
}
export const useJfGlobalProjectStore = create<ProjectState>()(
  persist(
    set => ({
      quarter: {
        quarterId: `${dayjs().get('year')}${dayjs().quarter()}`,
        quarterName: `${dayjs().get('year')}年${dayjs().quarter()}季度`,
      },
      projectId: '',
      projectName: '',
      projectCode: '',
      project: null,

      setProject: (pro = {}) =>
        set(state => ({
          ...state,
          projectId: pro.projectId || pro.id,
          projectName: pro.projectName || pro.name,
          projectCode: pro.projectCode || pro.code,
          project:
            state.project?.id && state.project.id === pro.id
              ? {
                  ...state.project,
                  ...pro,
                }
              : pro,
        })),
      setQuarter: qua =>
        set(state => ({
          ...state,
          quarter: qua,
        })),
    }),
    {
      name: 'jf-project-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
