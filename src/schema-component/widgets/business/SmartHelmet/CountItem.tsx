import { CountItemCount, CountItemUnit, CountItemWrap } from './style'

export function CountItem({
  count,
  unit = '',
}: {
  count?: string | number
  unit: string
}) {
  return (
    <CountItemWrap>
      <CountItemCount>{count || 0}</CountItemCount>
      <CountItemUnit>{unit}</CountItemUnit>
    </CountItemWrap>
  )
}
