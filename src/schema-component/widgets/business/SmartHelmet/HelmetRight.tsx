import { css } from "@emotion/css";
import { HelmetRightScrollWrap, HelmetRightWrap, RightLabel } from "./style";
import { AnaItem } from "./AnaItem";
import { safeArraySelect } from "@/schema-component/shared";

export function HelmetRight({
  applicationAnalysis = [],
}: {
  applicationAnalysis?: any[];
}) {
  return (
    <HelmetRightWrap>
      <RightLabel>项目应用分析</RightLabel>
      <HelmetRightScrollWrap>
        <div
          className={css`
            width: 100%;
            min-height: 100%;
          `}
        >
          {safeArraySelect(applicationAnalysis).map((ana, index) => {
            return <AnaItem key={index} {...ana} />;
          })}
        </div>
      </HelmetRightScrollWrap>
    </HelmetRightWrap>
  );
}
