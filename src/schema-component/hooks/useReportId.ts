
import { useParams } from 'react-router-dom';

export const useReportId = () => {
    const { shareURL } = useParams();
    return {
        reportId: shareURL || ''
    }
}
