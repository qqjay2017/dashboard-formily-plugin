import { observer } from "@formily/reactive-react";
import { Button, Radio, Space, message } from "antd";
import { useDesigner } from "@/designable/react";
import { transformToSchema } from "@/designable/Field";
import { useUpdateDashboard } from "@/schema-component";
import { useReportShare } from "@/hooks";

export const Actions = observer(({ shareURL }: { shareURL?: string }) => {
  const designer = useDesigner();
  const { updateDashboard } = useUpdateDashboard();
  const { reportShare } = useReportShare();
  const saveSchema = async () => {
    const tree = designer.getCurrentTree();

    const schema = transformToSchema(tree);

    await updateDashboard({
      content: JSON.stringify(schema),
    });
    message.success("保存成功");
  };

  const pubSchema = async () => {
    const tree = designer.getCurrentTree();

    const schema = transformToSchema(tree);

    await updateDashboard({
      content: JSON.stringify(schema),
    });
    message.success("发布成功");
  };

  const previewSchema = () => {
    reportShare(shareURL, {
      isHref: false,
    });
  };

  return (
    <Space style={{ marginRight: 10 }}>
      <Button
        onClick={() => {
          previewSchema();
        }}
      >
        预览
      </Button>
      <Button
        onClick={() => {
          saveSchema();
        }}
      >
        保存
      </Button>
      <Button
        type="primary"
        onClick={() => {
          pubSchema();
        }}
      >
        发布
      </Button>
    </Space>
  );
});
