import { Checkbox } from "antd";
import type { FormItemComponentProps } from "@/types";

export function DepFieldSetFormItem({
  value = {},
  onChange,
}: FormItemComponentProps) {
  return (
    <Checkbox.Group
      options={[
        {
          label: "时间查询",
          value: "quarterSelect",
        },
        {
          label: "项目查询",
          value: "projectSelect",
        },
      ]}
      value={Object.keys(value)}
      onChange={(e) => {
        onChange &&
          onChange(
            e.reduce((memo, cur) => {
              memo[cur] = cur;
              return memo;
            }, {})
          );
      }}
    />
  );
}
