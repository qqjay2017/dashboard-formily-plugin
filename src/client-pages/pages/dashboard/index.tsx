import { get } from "lodash-es";

import type { DashboardItem } from "./types";

import { CreateFormBtn } from "./CreateFormBtn";
import DashboardItemCard from "./DashboardItemCard";

import { apiBase } from "@/utils";
import { useRequest } from "@/api-client/hooks";
import type { APiWrap } from "@/api-client/hooks";

import PageContainer from "@/client-pages/components/PageContainer";
import CardList from "@/client-pages/components/CardList";

function DashboardIndex() {
  const { data, refetch } = useRequest<APiWrap<DashboardItem[]>>(
    `${apiBase}/dashboard`,
    {
      method: "GET",
    }
  );

  const list = get(data, "data.data", []) || [];

  return (
    <PageContainer title="仪表盘" extra={<CreateFormBtn />}>
      <CardList
        list={list}
        itemRender={(item) => {
          return <DashboardItemCard dashboard={item} refetch={refetch} />;
        }}
      />
    </PageContainer>
  );
}

export default DashboardIndex;
