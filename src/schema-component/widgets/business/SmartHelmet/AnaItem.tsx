import {
  AnaItemWrap,
  ProgressStatusLine3Percent,
  ProgressStatusLine3Style,
} from './style'
import { NumLabel } from './NumLabel'

export function AnaItem({
  projectName,
  rate = '0',
}: {
  projectName?: string
  rate?: string
}) {
  return (
    <AnaItemWrap>
      <NumLabel
        label={projectName}
        numColor="#F7BA5F"
        showColon={false}
        value={`${rate || 0}%`}
      />
      <ProgressStatusLine3Style
        style={{
          height: '10px',
          marginBottom: '0px',
          marginTop: '0.08rem',
        }}
      >
        <ProgressStatusLine3Percent
          style={{
            height: '10px',
            width: `${Math.min(Number(rate || 0), 100)}%`,
            backgroundImage: ` linear-gradient( 270deg, #FFFFFF 0%, #F29509 49%, rgba(242,149,9,0) 100%)`,
          }}
        />
      </ProgressStatusLine3Style>
    </AnaItemWrap>
  )
}
