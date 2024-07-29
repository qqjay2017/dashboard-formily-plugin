import {
  WarnListItemDate,
  WarnListItemDetail,
  WarnListItemLine,
  WarnListItemPoint,
  WarnListItemTitle,
  WarnListItemWrap,
} from './styles'

export function WarnListItem({
  title,
  details,
  date,
}: {
  title: string
  details: string
  date: string
}) {
  return (
    <WarnListItemWrap>
      <WarnListItemPoint />
      <WarnListItemLine />
      <WarnListItemTitle>{title}</WarnListItemTitle>
      <WarnListItemDetail>{details}</WarnListItemDetail>
      <WarnListItemDate>{date}</WarnListItemDate>
    </WarnListItemWrap>
  )
}
