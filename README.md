组件整合

### 列表页

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

### 卡片列表页面

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

### 父级路由(带左侧菜单)

```tsx
function ChartsLayout() {
  const { typeParam, setTypeParam } = useTypeParam("all");
  return (
    <PageLayout>
      <LayoutMenuWrap
        selectedKeys={[typeParam]}
        onClick={({ key }) => {
          setTypeParam(key);
        }}
        items={[
          {
            label: "全部",
            key: "all",
            icon: <BiSolidCategory />,
          },
          ...allChartType,
        ]}
      />

      <div className={layoutRightContentStyle}>
        <Outlet />
      </div>
    </PageLayout>
  );
}
```

### 新增-表单页面

```tsx
function ApiEditPage() {
  const id = useEditId();
  const apiClient = useAPIClient();

  const navigate = useNavigate();

  const { data } = useRequest(`${apiBase}/api-manage/${id}`, {
    enabled: !!id,
    method: "GET",
  });
  const dtData = get(data, "data.data", {});

  const form: any = useMemo(() => {
    if (!id) {
      return createForm({
        initialValues: {},
      });
    }
    return createForm({
      initialValues: {
        ...dtData,
        headers: JSON.parse(dtData?.headers || "[]"),
        mockJson: dtData?.mockJson || "{}",
      },
    });
  }, [dtData, id]);

  const onSubmit = async (values) => {
    const res = await apiClient.request({
      method: id ? "put" : "post",
      url: id
        ? `${apiBase}/api-manage/edit/${id}`
        : `${apiBase}/api-manage/create`,
      data: {
        ...values,
        headers: JSON.stringify(values.headers || []),
        url: (values.url || "").trim(),

        mockJson: values.mockJson || "{}",
      },
    });
    const resId = get(res, "data.data.id", "");
    if (resId) {
      navigate(-1);
    }
  };

  return (
    <FormProvider form={form}>
      <PageContainer
        title="新建数据配置"
        footer={[
          <Submit key="test">测试</Submit>,
          <Submit key="submit" type="primary" onSubmit={onSubmit}>
            提交
          </Submit>,
        ]}
      >
        <InternalFormLayout schema={editApiFormSchema} />
      </PageContainer>
    </FormProvider>
  );
}
```

### 弹窗表单

```tsx
function CreateFormBtn() {
  const navigate = useNavigate();
  const apiClient = useAPIClient();

  return (
    <Button
      type="primary"
      onClick={() => {
        const dialog = getFormDialog(
          {
            title: "新建",
          },
          createDashboardFormSchema
        );
        dialog
          .forConfirm(async (payload, next) => {
            const {
              name,
              description,
              themeProvider,
              isDarkTheme,
              designWidthEnum,
            } = payload.values;

            const { designWidth, designHeight } =
              getDesignSize(designWidthEnum);
            const res = await apiClient.request<any, APiWrap<{ id: number }>>({
              url: `${apiBase}/dashboard`,
              method: "POST",
              data: {},
            });
            const id = get(res, "data.data.id");
            if (id) {
              navigate(`/dashboard-design/${id}`);
            }
            next(payload);
          })
          .open({});
      }}
    >
      新建
    </Button>
  );
}
```

## 通用弹窗

```tsx
async function onTest(values) {
  try {
    const dialog = getModalDialog(
      {
        title: "测试API",
        width: "80vw",
      },
      <ApiTest apiId={id} formValues={values} />
    );
    dialog.open();
  } catch (error) {}
}
```

## 修改取数路径

传入dataPath属性

```ts
const apiClient = useAPIClient();
apiClient?.request({
  dataPath: "data",
});
```

## 内置属性

移动端自适应时候,不加头部高度

```
   "x-decorator-props": {
          disOffsetHeaderSize: true,

        },
```
