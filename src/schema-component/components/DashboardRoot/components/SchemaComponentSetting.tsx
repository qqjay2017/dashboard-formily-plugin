import { observer } from "@formily/reactive-react";

import { selectedTargetsStore } from "../selectedTargetsStore";
import { DesignComponentSetting } from "./DesignComponentSetting";
import { elementIdToEid } from "@/utils";

export const SchemaComponentSetting = observer(() => {
  const selectedTargets: any[] = selectedTargetsStore.value;
  if (
    !selectedTargets ||
    !selectedTargets.length ||
    selectedTargets.length > 1
  ) {
    return <DesignComponentSetting address={"dashboardRoot"} />;
  }
  const id = selectedTargets[0]?.id;
  if (!id) {
    return null;
  }
  const elementId = elementIdToEid(id);
  const last = elementId.split(".").pop();

  return (
    <DesignComponentSetting address={elementId} schemaCompoenntId={last} />
  );
});
