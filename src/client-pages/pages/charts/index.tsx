import { Button, message } from "antd";

import { get } from "lodash-es";

import { defaultChartTemplate } from "./consts";

import { createChartSchema } from "./createChartSchema";
import { ChartListItem } from "./ChartListItem";
import type { IChartItem } from "./types";

import type { APiWrap } from "@/api-client";
import { useAPIClient, useRequest } from "@/api-client";
import { apiBase } from "@/utils";
import { getFormDialog, showConfirmPromisify } from "@/schema-component/antd";
import PageContainer from "@/client-pages/components/PageContainer";
import CardList from "@/client-pages/components/CardList";
import { useTypeParam } from "@/client-pages/hooks";
import { useFetchChartAll } from "@/schema-component/widgets";

function ChartsIndex() {
  const { typeParam } = useTypeParam("all");
  const apiClient = useAPIClient();

  const chartType = !typeParam || typeParam === "all" ? undefined : typeParam;

  const { data, refetch } = useFetchChartAll(chartType);

  const editChart = (
    { id: chartId, name, type, description }: Partial<IChartItem>,
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
          url: `${apiBase}/chart`,
          method: isCreate ? "POST" : "PUT",
          data: {
            ...values,
            id: chartId,
            content: isCreate ? defaultChartTemplate : values.content,
          },
        });
        const id = get(res, "id");
        if (id) {
          refetch();
          message.success("提交成功");
        }
        next(payload);
      })
      .open({});
  };
  const chartList: IChartItem[] = data || [];

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
              onRemoveClick={async () => {
                try {
                  await showConfirmPromisify({});
                  await await apiClient.request<any, APiWrap<{ id: number }>>({
                    url: `${apiBase}/chart/${item.id}`,
                    method: "DELETE",
                    data: {
                      ...item,
                    },
                  });
                  await refetch();
                  message.success("删除成功");
                } catch (error) {}
              }}
            />
          );
        }}
      />
    </PageContainer>
  );
}
export default ChartsIndex;
