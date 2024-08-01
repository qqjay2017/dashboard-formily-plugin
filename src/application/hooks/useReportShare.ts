import { useNavigate } from 'react-router-dom'
import { BASE_URL, isProduct } from '@/utils/env'

export function useReportShare() {
  const navigate = useNavigate()
  return {
    reportShare: (shareURL = '', { isHref } = { isHref: false }) => {
      if (!shareURL) {
        return false
      }
      if (isHref) {
        return navigate(`/report/${shareURL}`)
      }
      const url = `${BASE_URL}report/${shareURL}`

      return window.open(
        url,
        url,
      )
    },
  }
}
