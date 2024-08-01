import { Button } from "antd";
import PageContainer from "@/client-pages/components/PageContainer";
import CardList from "@/client-pages/components/CardList";

export default function SystemDatasource() {
  const editDataSource = (
    initValue,
    { isCreate }: { isCreate?: boolean }
  ) => {};
  return (
    <PageContainer
      title="数据源管理"
      extra={[
        <Button
          type="primary"
          onClick={() =>
            editDataSource(
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
