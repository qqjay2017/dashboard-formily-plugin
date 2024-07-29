import { NumLabelLabel, NumLabelValue, NumLabelWrap } from './style'

export function NumLabel({
  label,
  value,
  numColor,
  showColon = true,
}: {
  label: string
  value?: string | number
  numColor?: string
  showColon?: boolean
}) {
  return (
    <NumLabelWrap>
      <NumLabelLabel>
        {label}
        {`${showColon ? ':' : ''}`}
      </NumLabelLabel>
      <NumLabelValue
        style={
          numColor
            ? {
                color: numColor,
              }
            : {}
        }
      >
        {value}
      </NumLabelValue>
    </NumLabelWrap>
  )
}
