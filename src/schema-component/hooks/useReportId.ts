import { useParams } from 'react-router-dom'

export function useReportId() {
  const { shareURL } = useParams()
  return {
    reportId: shareURL || '',
  }
}
