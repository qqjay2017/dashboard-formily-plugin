import React from "react";
import { observer } from "@formily/reactive-react";
import { selectedTargetsStore } from "../schema-component/components/DashboardRoot/selectedTargetsStore";
import { RootComponentSetting } from "./RootComponentSetting";

export const SchemaComponentSetting = observer(() => {
  const selectedTargets = selectedTargetsStore.value;
  if (
    !selectedTargets ||
    !selectedTargets.length ||
    selectedTargets.length > 1
  ) {
    return <RootComponentSetting />;
  }
  return <div>SchemaComponentSetting</div>;
});
