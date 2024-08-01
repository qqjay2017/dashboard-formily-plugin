组件整合

1. 列表页

```tsx
function ApiMain() {
  return (
    <PageContainer
      title="数据工厂"
      extra={[<CreateApiBtn key="CreateApiBtn" />]}
    >
      <InternalTable dataSource={dataSource} columns={[]} />
    </PageContainer>
  );
}
```

2. 卡片列表页面

```tsx
function ChartIndex() {
  const chartList: [];
  return (
    <PageContainer title="图表组件" extra={[]}>
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
```
