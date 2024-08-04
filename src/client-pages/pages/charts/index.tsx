import { Button, Pagination, message } from "antd";

import { useState } from "react";
import { css } from "@emotion/css";
import { createChartSchema } from "./createChartSchema";
import { ChartListItem } from "./ChartListItem";
import type { IChartItem } from "./types";

import { useEditChartApi } from "./useEditChartApi";
import type { APiWrap } from "@/api-client";
import { useAPIClient } from "@/api-client";
import { apiBase } from "@/utils";
import { getFormDialog, showConfirmPromisify } from "@/schema-component/antd";
import PageContainer from "@/client-pages/components/PageContainer";
import CardList from "@/client-pages/components/CardList";
import { usePaginationProps, useTypeParam } from "@/client-pages/hooks";
import { useFetchChartAllList } from "@/schema-component/widgets";
import { defaultMessage } from "@/utils/defaultMessage";
import InternalPagination from "@/client-pages/components/InternalPagination";

function ChartsIndex() {
  const { typeParam } = useTypeParam("all");
  const { pageNum, pageSize, paginationProps } = usePaginationProps();
  const apiClient = useAPIClient();
  const editChartApi = useEditChartApi();

  const chartType = !typeParam || typeParam === "all" ? undefined : typeParam;

  const { data, refetch } = useFetchChartAllList({
    type: chartType,
    pageNum,
    pageSize,
  });

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
        const res = await editChartApi({
          isCreate,
          chartId,
          values,
        });
        refetch();
        message.success(defaultMessage.submit);
        next(payload);
      })
      .open({});
  };
  const chartList: IChartItem[] = data?.rows || [];

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
                  message.success(defaultMessage.delete);
                } catch (error) {}
              }}
            />
          );
        }}
      />
      <InternalPagination {...paginationProps} total={data?.total} />
    </PageContainer>
  );
}
export default ChartsIndex;
