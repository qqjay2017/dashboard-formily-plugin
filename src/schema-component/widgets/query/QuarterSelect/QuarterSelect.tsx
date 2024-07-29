import { useMemo, useState } from "react";
import { useField } from "@formily/react";
import { css } from "@emotion/css";
import { useJfGlobalProjectStore } from "../ProjectSelect/useJfGlobalProjectStore";
import { QuaterSelectValue } from "./QuaterSelectValue";

import type { QuarterItemType } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/themes/style-components/ui";
import { useDashboardRoot } from "@/schema-component/components";
import { sizeFormat } from "@/utils";
import type { FormItemComponentProps } from "@/types";

const quarter: QuarterItemType[] = [
  {
    quarterId: 20201,
    quarterName: "2020年1季度",
  },
  {
    quarterId: 20202,
    quarterName: "2020年2季度",
  },
  {
    quarterId: 20203,
    quarterName: "2020年3季度",
  },
  {
    quarterId: 20204,
    quarterName: "2020年4季度",
  },
  {
    quarterId: 20211,
    quarterName: "2021年1季度",
  },
  {
    quarterId: 20212,
    quarterName: "2021年2季度",
  },
  {
    quarterId: 20213,
    quarterName: "2021年3季度",
  },
  {
    quarterId: 20214,
    quarterName: "2021年4季度",
  },
  {
    quarterId: 20221,
    quarterName: "2022年1季度",
  },
  {
    quarterId: 20222,
    quarterName: "2022年2季度",
  },
  {
    quarterId: 20223,
    quarterName: "2022年3季度",
  },
  {
    quarterId: 20224,
    quarterName: "2022年4季度",
  },
  {
    quarterId: 20231,
    quarterName: "2023年1季度",
  },
  {
    quarterId: 20232,
    quarterName: "2023年2季度",
  },
  {
    quarterId: 20233,
    quarterName: "2023年3季度",
  },
  {
    quarterId: 20234,
    quarterName: "2023年4季度",
  },
  {
    quarterId: 20241,
    quarterName: "2024年1季度",
  },
  {
    quarterId: 20242,
    quarterName: "2024年2季度",
  },
  {
    quarterId: 20243,
    quarterName: "2024年3季度",
  },
  {
    quarterId: 20244,
    quarterName: "2024年4季度",
  },
  {
    quarterId: 20251,
    quarterName: "2025年1季度",
  },
  {
    quarterId: 20252,
    quarterName: "2025年2季度",
  },
  {
    quarterId: 20253,
    quarterName: "2025年3季度",
  },
  {
    quarterId: 20254,
    quarterName: "2025年4季度",
  },
  {
    quarterId: 20261,
    quarterName: "2026年1季度",
  },
  {
    quarterId: 20262,
    quarterName: "2026年2季度",
  },
  {
    quarterId: 20263,
    quarterName: "2026年3季度",
  },
  {
    quarterId: 20264,
    quarterName: "2026年4季度",
  },
  {
    quarterId: 20271,
    quarterName: "2027年1季度",
  },
  {
    quarterId: 20272,
    quarterName: "2027年2季度",
  },
  {
    quarterId: 20273,
    quarterName: "2027年3季度",
  },
  {
    quarterId: 20274,
    quarterName: "2027年4季度",
  },
  {
    quarterId: 20281,
    quarterName: "2028年1季度",
  },
  {
    quarterId: 20282,
    quarterName: "2028年2季度",
  },
  {
    quarterId: 20283,
    quarterName: "2028年3季度",
  },
  {
    quarterId: 20284,
    quarterName: "2028年4季度",
  },
  {
    quarterId: 20291,
    quarterName: "2029年1季度",
  },
  {
    quarterId: 20292,
    quarterName: "2029年2季度",
  },
  {
    quarterId: 20293,
    quarterName: "2029年3季度",
  },
  {
    quarterId: 20294,
    quarterName: "2029年4季度",
  },
  {
    quarterId: 20301,
    quarterName: "2030年1季度",
  },
  {
    quarterId: 20302,
    quarterName: "2030年2季度",
  },
  {
    quarterId: 20303,
    quarterName: "2030年3季度",
  },
  {
    quarterId: 20304,
    quarterName: "2030年4季度",
  },
  {
    quarterId: 20311,
    quarterName: "2031年1季度",
  },
  {
    quarterId: 20312,
    quarterName: "2031年2季度",
  },
  {
    quarterId: 20313,
    quarterName: "2031年3季度",
  },
  {
    quarterId: 20314,
    quarterName: "2031年4季度",
  },
  {
    quarterId: 20321,
    quarterName: "2032年1季度",
  },
  {
    quarterId: 20322,
    quarterName: "2032年2季度",
  },
  {
    quarterId: 20323,
    quarterName: "2032年3季度",
  },
  {
    quarterId: 20324,
    quarterName: "2032年4季度",
  },
].map((q) => {
  return {
    ...q,
    quarterId: String(q.quarterId),
  };
});

function findQuarterItem(quarterId = "") {
  if (!quarterId) {
    return null;
  }
  const item = quarter.find((q) => String(q.quarterId) === quarterId);
  if (!item) {
    return null;
  }
  return {
    ...item,
    quarterId: String(item.quarterId),
  } as QuarterItemType;
}
export function QuarterSelect({ value, onChange }: FormItemComponentProps) {
  const { setQuarter } = useJfGlobalProjectStore();
  const { colWidth } = useDashboardRoot();
  const { decoratorProps } = useField();
  const w = decoratorProps?.w || 0;

  const [open, setOpen] = useState(false);

  const curQuarterItem = useMemo(() => {
    return findQuarterItem(value?.quarterId);
  }, [value?.quarterId]);

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      value={value?.quarterId}
      onValueChange={(e) => {
        const quarterItem = findQuarterItem(e);
        if (quarterItem) {
          setQuarter(quarterItem);
          onChange({
            ...quarterItem,
            quarterId: e,
          });
        }
      }}
    >
      <SelectTrigger asChild>
        <QuaterSelectValue
          value={curQuarterItem?.quarterName || ""}
          placeholder="请选择季度"
          open={open}
        />
      </SelectTrigger>
      <SelectContent
        sideOffset={5}
        style={{
          width: sizeFormat(colWidth * w),
        }}
      >
        {quarter.map((q) => {
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
  );
}
