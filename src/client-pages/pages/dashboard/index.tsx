import { CreateFormBtn } from "./CreateFormBtn";
import DashboardItemCard from "./DashboardItemCard";

import { useDashboardAll, useDashboardList } from "./useDashboardAll";

import { useCreateEffcts } from "./useCreateEffcts";
import PageContainer from "@/client-pages/components/PageContainer";
import CardList from "@/client-pages/components/CardList";
import InternalPagination from "@/client-pages/components/InternalPagination";
import { usePaginationProps } from "@/client-pages/hooks";

function DashboardIndex() {
  const { data, refetch, isLoading } = useDashboardList();
  const { paginationProps } = usePaginationProps();
  const createEffcts = useCreateEffcts();
  return (
    <PageContainer
      title="仪表盘"
      extra={<CreateFormBtn refetch={refetch} />}
      loading={isLoading}
    >
      <CardList
        list={data?.rows || []}
        itemRender={(item) => {
          return (
            <DashboardItemCard
              dashboard={item}
              refetch={refetch}
              createEffcts={createEffcts}
            />
          );
        }}
      />
      <InternalPagination {...paginationProps} total={data?.total} />
    </PageContainer>
  );
}

export default DashboardIndex;
