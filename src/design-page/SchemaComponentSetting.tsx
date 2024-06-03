import React from "react";
import { observer } from "@formily/reactive-react";
import { selectedTargetsStore } from "../schema-component/components/DashboardRoot/selectedTargetsStore";

export const SchemaComponentSetting = observer(() => {
  console.log(selectedTargetsStore.value, "selectedTargetsStore");
  return <div>SchemaComponentSetting</div>;
});
