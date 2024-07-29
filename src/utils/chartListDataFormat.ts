import Decimal from "decimal.js";
import { getPercent } from "./getPercent";

export interface ChartListItem {
  name: string;
  value: number;
  percent?: number;
  percentFormat?: number;
  percentDisplay?: string;
}

export function getTotalNum(chartListData: ChartListItem[]) {
  if (!chartListData || !chartListData.length) {
    return 0;
  }
  const totalNum = chartListData.reduce((memo, cur) => {
    memo = memo.add(cur.value || 0);
    return memo;
  }, new Decimal(0));

  return totalNum.toNumber();
}

export function chartListDataFormat(chartListData: ChartListItem[] = []) {
  const totalNum = getTotalNum(chartListData);
  const newChartListData = chartListData.map((c) => {
    const value =
      typeof c.value !== "number"
        ? new Decimal(c.value || 0).toNumber()
        : c.value;
    const percent = new Decimal(
      Decimal.div(value, totalNum).toFixed(2)
    ).toNumber();
    const percentFormat = getPercent(value, totalNum, { fixed: 1 });
    return {
      ...c,
      _totalNum: totalNum,
      value,
      percent,
      percentFormat,
      percentDisplay: `${percentFormat}%`,
    };
  });
  return {
    totalNum,
    chartListData: newChartListData,
  };
}

export function findItemByName(
  chartListData: ChartListItem[] = [],
  name: string
) {
  const item = chartListData.find((item) => item.name === name);
  return {
    ...item,
    value: item.value || 0,
    percent: item.percent || 0,
    percentFormat: item.percentFormat || 0,
    percentDisplay: item.percentDisplay || "0%",
  };
}

/**
 * 0.2=> {percentFormat:20,percentDisplay:"20%"}
 * @param percent
 * @returns
 */

export function percentToDisplay(percent: number | string) {
  const percentFormatIns = Decimal.mul(percent || 0, 100);
  return {
    percentFormat: new Decimal(percentFormatIns.toFixed(1)).toNumber(),
    percentDisplay: `${new Decimal(percentFormatIns.toFixed(1)).toNumber()}%`,
  };
}
