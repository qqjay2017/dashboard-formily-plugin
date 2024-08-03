import { onFieldReact, onFieldValueChange } from "@formily/core";
import { useAppGroupAll } from "../system/app-name/useAppGroupAll";

export function useCreateEffcts() {
  const { data: appGroupAll = [] } = useAppGroupAll();

  const setAppGroupName = (field, form) => {
    if (field.value) {
      const item = appGroupAll.find((item) => item.id === field.value);
      if (item) {
        form.setValues({
          appGroupName: item.name,
        });
      }
    } else {
      form.setValues({
        appGroupName: null,
      });
    }
  };

  return () => {
    onFieldReact("appGroupId", (field: any, form) => {
      field.dataSource = appGroupAll.map((appGroup) => ({
        label: appGroup.name,
        value: appGroup.id,
      }));
      setAppGroupName(field, form);
      field.loading = false;
    });
    onFieldValueChange("appGroupId", setAppGroupName);
  };
}
