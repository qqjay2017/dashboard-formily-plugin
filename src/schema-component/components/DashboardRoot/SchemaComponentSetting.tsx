import { observer } from "@formily/reactive-react";

// import { RootComponentSetting } from "./RootComponentSetting";
import { selectedTargetsStore } from "./selectedTargetsStore";
import { DesignComponentSetting } from "./DesignComponentSetting";
import { elementIdToEid } from "../../../utils";

export const SchemaComponentSetting = observer(() => {
  const selectedTargets: any[] = selectedTargetsStore.value;
  if (
    !selectedTargets ||
    !selectedTargets.length ||
    selectedTargets.length > 1
  ) {
    // return <RootComponentSetting />;
    return <DesignComponentSetting address={"dashboardRoot"} />;
  }
  const id = selectedTargets[0]?.id;
  if (!id) {
    return null;
  }
  console.log(selectedTargets, "selectedTargets");
  return <DesignComponentSetting address={elementIdToEid(id)} />;
});
