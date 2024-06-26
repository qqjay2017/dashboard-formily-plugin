import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAPIClient } from "../../../../api-client";
import { get } from "lodash-es";

export const ProjectBudget = () => {
  const apiClient = useAPIClient();
  const { data, isLoading } = useQuery({
    queryKey: ["/api/bg/v1/fee/budget"],
    queryFn: () =>
      apiClient.request({
        method: "get",
        url: "/api/bg/v1/fee/budget",
      }),
  });
  const amount = get(data, "data.data.totalBudget", "0");
  return (
    <div>
      <div>在建项目总预算（万元）</div>
      <div>{amount}</div>
    </div>
  );
};

ProjectBudget.displayName = "ProjectBudget";
