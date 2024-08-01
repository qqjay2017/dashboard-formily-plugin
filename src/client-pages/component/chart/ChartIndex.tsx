import { css } from "@emotion/css";
import { Button, Col, Row } from "antd";

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
import PageContainer from "@/client-pages/components/PageContainer";

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
    <PageContainer
      title="图表组件"
      extra={[
        <Button type="primary" onClick={createChart} key="createChartBtn">
          新建
        </Button>,
      ]}
    >
      <Row
        className={css`
          padding: 0 16px;
        `}
      >
        {chartList.map((c) => {
          return (
            <Col
              span={24}
              xs={24}
              sm={12}
              md={12}
              lg={8}
              xl={6}
              key={c.id}
              className={css`
                /* padding: 0 8px; */
                margin-block: 8px;
                margin-inline: 0;
                padding-block: 0;
                padding-inline: 8px;
              `}
            >
              <ChartListItem
                {...c}
                onEditClick={() => {
                  editChart(c);
                }}
              />
            </Col>
          );
        })}
      </Row>
    </PageContainer>
  );
}
export default ChartIndex;
