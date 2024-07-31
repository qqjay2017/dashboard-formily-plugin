import { css } from "@emotion/css";
import { Button } from "antd";

import { get } from "lodash-es";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { defaultChartTemplate } from "./consts";

import { createChartSchema } from "./createChartSchema";
import { ChartListItem } from "./ChartListItem";
import type { IChartItem } from "./types";
import { CreateBtnWrap } from "@/themes/style-components";

import type { APiWrap } from "@/api-client";
import { useAPIClient, useRequest } from "@/api-client";
import { apiBase } from "@/utils";
import { useFormDialog } from "@/schema-component/antd";

export function ChartIndex() {
  const navigate = useNavigate();
  const { type } = useParams();
  const apiClient = useAPIClient();

  const chartType = !type || type === "all" ? undefined : type;

  const { data, refetch } = useRequest(`${apiBase}/chart`, {
    method: "GET",
    params: {
      type: chartType,
    },

    refreshDeps: [chartType],
  });
  const { getFormDialog } = useFormDialog();

  const createChart = () => {
    const dialog = getFormDialog(
      {
        title: "新建",
      },
      createChartSchema
    );

    dialog
      .forConfirm(async (payload, next) => {
        const values = payload.values;
        const res = await apiClient.request<any, APiWrap<{ id: number }>>({
          url: `${apiBase}/chart`,
          method: "POST",
          data: {
            ...values,
            template: defaultChartTemplate,
          },
        });
        const id = get(res, "data.data.id");
        if (id) {
          navigate(`/component/chart-edit/${id}`);
        }
        next(payload);
      })
      .open({});
  };

  const editChart = ({ id: chartId, name, type, description }: IChartItem) => {
    const dialog = getFormDialog(
      {
        title: "新建",
      },
      createChartSchema
    );

    dialog
      .forOpen((payload, next) => {
        next({
          initialValues: {
            name,
            type,
            description,
          },
        });
      })
      .forConfirm(async (payload, next) => {
        const values = payload.values;
        const res = await apiClient.request<any, APiWrap<{ id: number }>>({
          url: `${apiBase}/chart/${chartId}`,
          method: "PUT",
          data: {
            ...values,
          },
        });
        const id = get(res, "data.data.id");
        if (id) {
          refetch();
        }
        next(payload);
      })
      .open({});
  };
  const chartList: IChartItem[] = get(data, "data.data", []) || [];

  return (
    <>
      <CreateBtnWrap>
        <Button type="primary" onClick={createChart}>
          新建
        </Button>
      </CreateBtnWrap>
      <div
        className={css`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        {chartList.map((c) => {
          return (
            <ChartListItem
              key={c.id}
              {...c}
              onEditClick={() => {
                editChart(c);
              }}
            />
          );
        })}
      </div>
    </>
  );
}
export default ChartIndex;
