import { Button } from "antd";
import PageContainer from "@/client-pages/components/PageContainer";
import CardList from "@/client-pages/components/CardList";

export default function SystemFilter() {
  const editFilter = (initValue, { isCreate }: { isCreate?: boolean }) => {};
  return (
    <PageContainer
      title="过滤器管理"
      extra={[
        <Button
          type="primary"
          onClick={() =>
            editFilter(
              {
                type: "",
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
        list={[{ id: "123" }]}
        itemRender={(item) => {
          return <div>建设中</div>;
        }}
      />
    </PageContainer>
  );
}
