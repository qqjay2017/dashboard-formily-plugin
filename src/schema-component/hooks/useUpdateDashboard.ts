import { useParams } from "react-router-dom";
import { useAPIClient } from "../../api-client";
import { apiBase } from "@/utils";

export function useUpdateDashboard() {
  const apiClient = useAPIClient();

  const { id } = useParams();

  return {
    id,
    updateDashboard: (data, _id?: string) =>
      apiClient.request({
        url: `${apiBase}/designer/${_id || id}`,
        method: "put",
        data,
      }),
  };
}
