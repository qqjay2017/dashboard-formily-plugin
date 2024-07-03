import { css } from "@emotion/css";

import ReactECharts from "echarts-for-react";
import { useConstrucPersonChartOption } from "./useConstrucPersonChartOption";
import { ConstrucPersonChartSchemeWrap } from "./ConstrucPersonChartSchemeWrap";
import { ConstrucPersonChartMenuItem } from "./ConstrucPersonChartMenuItem";
import { ConstrucPersonChartSettingSchema } from "./ConstrucPersonChartSettingSchema";
import { observer } from "@formily/react";

const constructionParticipant = [
  {
    typeName: "架子工",
    number: 4,
  },
  {
    typeName: "木工班组",
    number: 27,
  },
  {
    typeName: "塔吊班组",
    number: 12,
  },
  {
    typeName: "杂工班组",
    number: 47,
  },
  {
    typeName: "止水钢板班组",
    number: 3,
  },
  {
    typeName: "桩基班组",
    number: 82,
  },
];
export const ConstrucPersonChart: any = observer((props: any) => {
  console.log(props, "props");
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
      `}
    >
      <ReactECharts
        style={{
          width: "100%",
          height: "100%",
        }}
        option={useConstrucPersonChartOption(constructionParticipant)}
      />
    </div>
  );
});

ConstrucPersonChart.displayName = "ConstrucPersonChart";

ConstrucPersonChart.schemaFn = ConstrucPersonChartSchemeWrap;
ConstrucPersonChart.menuItem = ConstrucPersonChartMenuItem;
ConstrucPersonChart.settingSchema = ConstrucPersonChartSettingSchema;
