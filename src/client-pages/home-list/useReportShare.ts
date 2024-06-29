import { useNavigate } from "react-router-dom"


export const useReportShare = () => {
    const navigate = useNavigate()
    return {
        reportShare: (shareURL = '', { isHref } = { isHref: false }) => {
            if (!shareURL) {
                return false
            }
            const url = `/report/${shareURL}`
            if (isHref) {
                return navigate(`/${shareURL}`)
            }
            return window.open(
                url,
                url
            );

        }
    }
}
