import { useQuery } from "@tanstack/react-query";

import { useAPIClient } from "../../../../api-client";
import { get } from "lodash-es";
import { css } from "@emotion/css";
import { useToken } from "../../../../style";

export const ProjectBudget = () => {
  const { token } = useToken();

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
    <div
      className={css`
        width: 100%;
        height: 100%;
      `}
    >
      <div
        className={css`
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
        `}
      >
        <div
          className={css`
            font-size: 0.16rem;
            color: ${token.nodeContentForeground};
            line-height: 0.16rem;
            opacity: 0.65;
          `}
        >
          在建项目总预算（万元）
        </div>
        <div
          className={css`
            font-family: Digiface;
            font-size: 0.36rem;
            color: #49ffdf;
          `}
        >
          {amount}
        </div>
      </div>
    </div>
  );
};

ProjectBudget.displayName = "ProjectBudget";
