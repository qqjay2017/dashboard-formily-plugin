import React from "react";
import { useQuery, useReqApiProxy } from "../../api-client";

export const ApiTest = ({ apiId }: { apiId: string }) => {
  const { request } = useReqApiProxy();
  const { data, refetch, error } = useQuery({
    queryKey: ["apiTest", apiId],
    enabled: !!apiId,
    queryFn: () =>
      request({
        apiId,
      }),
  });
  return (
    <div>
      <div>{JSON.stringify(error)}</div>
      <div>123</div>
      <div> {JSON.stringify(data)}</div>
    </div>
  );
};
