import { css } from "@emotion/css";
import { useToken } from "@/schema-component/antd/style";
import { Tabs, TabsList, TabsTrigger2 } from "@/themes/style-components/ui";

export function EmpTypeSelect({
  value,
  onChange,
}: {
  value?: any;
  onChange?: any;
}) {
  const { token } = useToken();
  return (
    <Tabs defaultValue="1" value={value} onValueChange={onChange}>
      <TabsList>
        <TabsTrigger2
          value="1"
          className={css`
            color: ${token.textCommon};
          `}
        >
          良好信息
        </TabsTrigger2>
        <TabsTrigger2
          value="2"
          className={css`
            color: ${token.textCommon};
          `}
        >
          不良信息
        </TabsTrigger2>
      </TabsList>
    </Tabs>
  );
}
