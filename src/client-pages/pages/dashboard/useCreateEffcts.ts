import { onFieldReact, onFieldValueChange } from "@formily/core";
import { useAppGroupAll } from "../system/app-name/useAppGroupAll";

export function useCreateEffcts() {
  const { data: appGroupAll = [] } = useAppGroupAll();

  return () => {
    onFieldReact("appGroupId", (field: any) => {
      field.dataSource = appGroupAll.map((appGroup) => ({
        label: appGroup.name,
        value: appGroup.id,
      }));
      field.loading = false;
      return field;
    });
    onFieldValueChange("appGroupId", (field, form) => {
      if (field.value) {
        const item = appGroupAll.find((item) => item.id === field.value);
        if (item) {
          form.setValues({
            appGroupName: item.name,
          });
        }
      }
    });
  };
}
