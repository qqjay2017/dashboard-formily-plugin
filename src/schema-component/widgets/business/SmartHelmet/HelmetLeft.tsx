import { NumLabel } from './NumLabel'
import {
  HelmetLeftBottompWrap,
  HelmetLeftTopWrap,
  HelmetLeftWrap,
} from './style'
import type { SafetyProjectType } from './types'
import { CountItem } from './CountItem'
import { percentToDisplay } from '@/utils'

export function HelmetLeft({
  safetyProject,
}: {
  safetyProject: SafetyProjectType
}) {
  return (
    <HelmetLeftWrap>
      <HelmetLeftTopWrap>
        <NumLabel
          label="应用项目数"
          showColon={false}
          value={`${percentToDisplay(safetyProject.applicationRate).percentDisplay}`}
        />
        <CountItem count={safetyProject.applicationItemNum} unit="个" />
      </HelmetLeftTopWrap>
      <HelmetLeftBottompWrap>
        <NumLabel
          label="监测人员数"
          showColon={false}
          value={`${percentToDisplay(safetyProject.monitoringRate).percentDisplay}`}
        />
        <CountItem count={safetyProject.monitoringPersonnelNum} unit="人" />
      </HelmetLeftBottompWrap>
    </HelmetLeftWrap>
  )
}
