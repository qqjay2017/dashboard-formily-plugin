import { Button } from "antd";

import { get } from "lodash-es";

import { defaultChartTemplate } from "./consts";

import { createChartSchema } from "./createChartSchema";
import { ChartListItem } from "./ChartListItem";
import type { IChartItem } from "./types";

import type { APiWrap } from "@/api-client";
import { useAPIClient, useRequest } from "@/api-client";
import { apiBase } from "@/utils";
import { getFormDialog, useFormDialog } from "@/schema-component/antd";
import PageContainer from "@/client-pages/components/PageContainer";
import CardList from "@/client-pages/components/CardList";
import { useTypeParam } from "@/client-pages/hooks";

export function ChartIndex() {
  const { typeParam } = useTypeParam("all");
  const apiClient = useAPIClient();

  const chartType = !typeParam || typeParam === "all" ? undefined : typeParam;

  const { data, refetch } = useRequest(`${apiBase}/chart`, {
    method: "GET",
    params: {
      type: chartType,
    },

    refreshDeps: [chartType],
  });

  const editChart = (
    { id: chartId = "", name, type, description }: Partial<IChartItem>,
    {
      isCreate,
    }: {
      isCreate?: boolean;
    }
  ) => {
    const dialog = getFormDialog(
      {
        title: isCreate ? "新建" : "编辑",
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
          method: isCreate ? "POST" : "PUT",
          data: {
            ...values,
            template: isCreate ? defaultChartTemplate : values.template,
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
    <PageContainer
      title="图表组件"
      extra={[
        <Button
          type="primary"
          onClick={() =>
            editChart(
              {
                type: chartType,
              },
              {
                isCreate: true,
              }
            )
          }
          key="createChartBtn"
        >
          新建
        </Button>,
      ]}
    >
      <CardList
        list={chartList}
        itemRender={(item) => {
          return (
            <ChartListItem
              {...item}
              onEditClick={() => {
                editChart(item, {
                  isCreate: false,
                });
              }}
            />
          );
        }}
      />
    </PageContainer>
  );
}
export default ChartIndex;
