import { css } from "@emotion/css";
import { useToken } from "@/style";
import { Tabs, TabsContent, TabsList, TabsTrigger, TabsTrigger2 } from "@/ui";

export function RecentDateSelect({
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
          近7天
        </TabsTrigger2>
        <TabsTrigger2
          value="2"
          className={css`
            color: ${token.textCommon};
          `}
        >
          近4周
        </TabsTrigger2>
        <TabsTrigger2
          value="3"
          className={css`
            color: ${token.textCommon};
          `}
        >
          近6月
        </TabsTrigger2>
      </TabsList>
    </Tabs>
  );
}
