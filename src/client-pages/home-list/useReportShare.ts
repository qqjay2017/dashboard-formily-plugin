

export const useReportShare = () => {
    return {
        reportShare: (shareURL = '') => {
            if (!shareURL) {
                return false
            }
            return window.open(
                `/report/${shareURL}`,
                `/report/${shareURL}`
            );

        }
    }
}
