import { css } from "@emotion/css";
import { useState } from "react";

import { useToken } from "@/schema-component/antd/style";
import {
  BaseSelectValue,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Tabs,
  TabsList,
  TabsTrigger2,
} from "@/dashboard-themes/ui";

export function AiotTypeChange({
  value,
  onChange,

  equipmentType = "",
}: {
  value?: any;
  onChange?: any;
  equipmentType?: any;
}) {
  const { token } = useToken();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={css`
          margin-right: 0.16rem;
        `}
      >
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
      </div>
      <div
        className={css`
          width: 1.5rem;
          height: 0.3rem;
        `}
      >
        <Select
          open={open}
          onOpenChange={setOpen}
          value={value?.quarterId}
          onValueChange={(e) => {
            // const quarterItem = findQuarterItem(e);
            // if (quarterItem) {
            //   setQuarter(quarterItem);
            //   onChange({
            //     ...quarterItem,
            //     quarterId: e,
            //   });
            // }
          }}
        >
          <SelectTrigger asChild>
            <BaseSelectValue
              value={equipmentType || ""}
              placeholder="全部设备"
              open={open}
            />
          </SelectTrigger>
          <SelectContent
            sideOffset={5}
            style={{
              width: "1.5rem",
            }}
          >
            {[].map((q) => {
              return (
                <SelectItem
                  key={`${q.quarterId}-${q.quarterName}`}
                  value={String(q.quarterId)}
                  textValue={q.quarterName}
                >
                  <div
                    className={css`
                      padding: 0 0.16rem;
                    `}
                  >
                    {q.quarterName}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
