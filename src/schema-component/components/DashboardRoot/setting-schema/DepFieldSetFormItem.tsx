import { FormItemComponentProps } from "@/types";
import { Checkbox } from "antd";

export const DepFieldSetFormItem = ({
  value = [],
  onChange,
}: FormItemComponentProps) => {
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
      value={value}
      onChange={onChange}
    />
  );
};
