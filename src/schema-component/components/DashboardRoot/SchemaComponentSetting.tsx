import React from "react";
import { observer } from "@formily/reactive-react";

import { RootComponentSetting } from "./RootComponentSetting";
import { selectedTargetsStore } from "./selectedTargetsStore";

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
