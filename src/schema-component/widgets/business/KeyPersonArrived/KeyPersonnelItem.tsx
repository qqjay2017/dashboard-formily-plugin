import { useMemo } from 'react'
import { ItemImg, ItemWrap, JobTitle, NumWrap } from './styles'
import { NumLabel } from './NumLabel'
import { rs } from '@/utils'

export function KeyPersonnelItem({
  attendanceNum,
  jobTitle = '',
  rate,
  unAttendanceNum,
}: {
  attendanceNum?: number
  jobTitle?: string
  rate?: string | number
  unAttendanceNum?: number
}) {
  const imgSrc = useMemo(() => {
    if (jobTitle === '项目经理') {
      return '/assets/schema-component/KeyPersonArrived/xmjl.png'
    }
    if (jobTitle === '专职安全员') {
      return '/assets/schema-component/KeyPersonArrived/zzaqy.png'
    }

    return '/assets/schema-component/KeyPersonArrived/zj.png'
  }, [jobTitle])

  const isWarn = !rate || Number(rate) <= 50
  return (
    <ItemWrap>
      <ItemImg src={rs(imgSrc)} />
      <JobTitle>{jobTitle}</JobTitle>
      <NumWrap>
        <NumLabel label="出勤人数" value={attendanceNum} />
        <NumLabel label="未出勤人数" value={unAttendanceNum} />
        <NumLabel
          label="出勤率"
          value={`${rate || 0}%`}
          numColor={
            isWarn ? 'rgba(255, 119, 119, 1)' : 'rgba(100, 227, 255, 1)'
          }
        />
      </NumWrap>
    </ItemWrap>
  )
}
