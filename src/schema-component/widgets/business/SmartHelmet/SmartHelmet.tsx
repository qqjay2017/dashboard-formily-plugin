import { get } from "lodash-es";
import { css } from "@emotion/css";

import { HelmetLeft } from "./HelmetLeft";
import { HelmetRight } from "./HelmetRight";
import type { ApplicationAnalysiItem, SafetyProjectType } from "./types";
import {
  useDataBindFetch,
  useQueryToBusParams,
} from "@/schema-component/hooks";
import type { SchemComponentWithDataSourceProps } from "@/types";
import injectApiInfo from "@/schema-component/hoc/injectApiInfo";

function SmartHelmetMain({ busDataRes }: SchemComponentWithDataSourceProps) {
  const safetyProject: SafetyProjectType = get(
    busDataRes,
    "data.data.safetyProject",
    {}
  );
  const applicationAnalysis: ApplicationAnalysiItem[] =
    get(busDataRes, "data.data.applicationAnalysis", []) || [];

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        display: flex;
      `}
    >
      <HelmetLeft safetyProject={safetyProject} />
      <HelmetRight applicationAnalysis={applicationAnalysis} />
    </div>
  );
}

export const SmartHelmet = injectApiInfo(SmartHelmetMain);
