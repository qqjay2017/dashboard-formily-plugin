import { css } from "@emotion/css";
import { Button } from "antd";

import { get } from "lodash-es";
import { useNavigate, useSearchParams } from "react-router-dom";

import { LuDatabase } from "react-icons/lu";

import { allChartType, defaultChartTemplate } from "./consts";
import { ChartTypeItem } from "./ChartTypeItem";
import { createChartSchema } from "./createChartSchema";
import { ChartListItem } from "./ChartListItem";
import type { IChartItem } from "./types";
import { CreateBtnWrap } from "@/themes/style-components";

import type { APiWrap } from "@/api-client";
import { useAPIClient, useRequest } from "@/api-client";
import { apiBase } from "@/utils";
import { FormDialogPortal, useFormDialog } from "@/schema-component/antd";

export function ChartIndex() {
  const navigate = useNavigate();
  const apiClient = useAPIClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const chartType = searchParams.get("type") || "";

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
    <div
      className={css`
        width: 100%;
        height: 100%;
      `}
    >
      <div
        className={css`
          width: 100vw;
          height: calc(100vh - 5px);
          display: flex;
        `}
      >
        <div
          className={css`
            width: 200px;
            height: 100%;
            overflow: hidden auto;
            background-color: #fff;
          `}
        >
          {[
            {
              label: "全部",
              name: "",
              icon: <LuDatabase />,
            },
            ...allChartType,
          ].map((type, index) => {
            return (
              <ChartTypeItem
                key={type.name + index}
                {...type}
                isActive={chartType === type.name}
                onClick={() => {
                  setSearchParams({
                    type: type.name,
                  });
                }}
              />
            );
          })}
        </div>
        <div
          className={css`
            height: 100%;
            width: calc(100% - 200px);
            background-color: rgb(243, 244, 250);
            overflow: hidden auto;
            padding-bottom: 80px;
          `}
        >
          <CreateBtnWrap>
            <FormDialogPortal>
              <Button type="primary" onClick={createChart}>
                新建
              </Button>
            </FormDialogPortal>
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
        </div>
      </div>
    </div>
  );
}
export default ChartIndex;
