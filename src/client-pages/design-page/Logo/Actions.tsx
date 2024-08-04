import { observer } from "@formily/reactive-react";
import { Button, Radio, Space, message } from "antd";
import { useDesigner } from "@/designable/react";
import { transformToSchema } from "@/designable/Field";

import { useReportShare } from "@/application/hooks";
import { useUpdateDashboard } from "@/schema-component/hooks";
import { htmlImgUtil } from "@/utils/htmlImgUtil";
import { defaultMessage } from "@/utils/defaultMessage";

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
    message.success(defaultMessage.submit);
  };

  const pubSchema = async () => {
    const imgSrc = await htmlImgUtil({ element: "DashboardRoot" });

    const tree = designer.getCurrentTree();

    const schema = transformToSchema(tree);

    await updateDashboard({
      content: JSON.stringify(schema),
      coverThumbnail: imgSrc?.fileSrcUrl || undefined,
    });
    message.success(defaultMessage.publish);
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
