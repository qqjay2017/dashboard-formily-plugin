import { useParams } from "react-router-dom";
import { get } from "lodash-es";
import { css } from "@emotion/css";
import React, { useEffect, useRef, useState } from "react";
import { Select, Spin, Switch, message } from "antd";
import Handlebars from "handlebars";
import * as echarts from "echarts";
import html2canvas from "html2canvas";
import Decimal from "decimal.js";

import { defaultChartTemplate } from "./consts";

import { chartMockData, chartMockDataOptions } from "./chartMockData";
import { ChartEditRight } from "./ChartEditRight";
import type { MonacoEditorHandles } from "@/schema-component";
import { MonacoEditor } from "@/schema-component";
import { useAPIClient } from "@/api-client";
import {
  apiBase,
  chartListDataFormat,
  findItemByName,
  getPercent,
  getTotalNum,
  percentToDisplay,
} from "@/utils";
import { useApp } from "@/application";
import { useCustomThemeToken } from "@/dashboard-themes";
import { useToken } from "@/schema-component/antd/style";

function ChartEditPage() {
  const { token: antdToken } = useToken();
  const chartOptionEditorRef = useRef<MonacoEditorHandles>(null);
  const app = useApp();
  const apiClient = useAPIClient();
  const { id } = useParams();
  const [spinning, setSpinning] = useState(false);
  const [chartMockDataType, setChartMockDataType] = useState("standard");
  const [themeProvider, setThemeName] = useState("technologyBlue");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [template, setTemplate] = useState("");
  const [chartOption, setChartOption] = useState(null);
  const [chartOptionStr, setChartOptionStr] = useState("");
  const { token: customThemeToken } = useCustomThemeToken({
    isDarkTheme,
    themeProvider,
  });
  const handleCompileTemplate = (template = "", mockDataType = "") => {
    if (!template) {
      app.message.warning("图表模版内容为空,请输入");
      return false;
    }
    try {
      const handlebarsTemplate = Handlebars.compile(template);
      const { chartListData, totalNum } = chartListDataFormat(
        chartMockData[mockDataType || chartMockDataType] || []
      );

      const handlebarsStr = handlebarsTemplate({
        chartListData,
      });
      // eslint-disable-next-line no-new-func
      const funCode = new Function(
        "echarts",
        "chartListData",
        "token",
        "busData",

        "chartHelps",
        `option=null;${handlebarsStr};return option||{};`
      );
      // 注入变量
      const c =
        funCode(
          echarts,
          chartListData,
          {
            ...antdToken,
            ...customThemeToken,
          },
          {},

          {
            Decimal,
            get,
            getTotalNum,
            findItemByName,
            percentToDisplay,
            getPercent,
            chartListDataFormat,
            totalNum,
          }
        ) || {};
      setChartOption(c);
      setChartOptionStr(JSON.stringify(c));
      setTimeout(() => {
        chartOptionEditorRef.current?.formatDocument();
      }, 200);
      return template;
    } catch (error) {
      console.error(error);
      app.message.error("代码执行失败");
    }
  };
  const handleSaveTemplate = async (temp) => {
    const newTemp = handleCompileTemplate(temp);
    if (!newTemp) {
      return false;
    }
    setSpinning(true);
    setTimeout(() => {
      save();
    }, 1500);

    async function save() {
      try {
        const canvas = await html2canvas(
          document.getElementById("ChartViewCore"),
          {
            scale: 1,
          }
        );
        const coverThumbnail = canvas.toDataURL("image/webp", 0.8);
        await apiClient.request({
          url: `${apiBase}/chart/${id}`,
          method: "put",
          data: {
            coverThumbnail,
            template: newTemp,
          },
        });
        setSpinning(false);
        message.success("保存成功");
      } catch (error) {
        setSpinning(false);
      }
    }
  };

  useEffect(() => {
    apiClient
      .request({
        url: `${apiBase}/chart/${id}`,
      })
      .then((res) => {
        const chartDt = get(res, "data.data", {}) || {};
        const type = chartDt.type;
        const isPie = type === "pie";
        if (isPie) {
          setChartMockDataType("pieData");
        }

        const template = chartDt.template || defaultChartTemplate;
        setTemplate(template);
        handleCompileTemplate(template, isPie ? "pieData" : "");
      });
  }, [id]);

  if (!template) {
    return null;
  }
  return (
    <div
      className={css`
        width: 100vw;
        height: calc(100vh - 50px);
        display: flex;
      `}
    >
      <Spin spinning={spinning}>
        <div
          className={css`
            min-width: 400px;
            width: calc(100vw - 450px);
            height: 100%;
            border-right: 1px solid #dcdfe6;
          `}
        >
          <div
            className={css`
              width: 100%;
              height: 30px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              display: flex;
              align-items: center;
              justify-content: flex-end;
              column-gap: 12px;

              border-bottom: 1px solid #dcdfe6;
            `}
          >
            <Select
              size="small"
              value={themeProvider}
              defaultValue="technologyBlue"
              className={css`
                width: 150px;
              `}
              options={[
                {
                  label: "科技蓝",
                  value: "technologyBlue",
                },
                {
                  label: "复古绿",
                  value: "green",
                },
              ]}
              onChange={(e) => {
                setThemeName(e);
              }}
            />
            <Switch
              checkedChildren="深色"
              unCheckedChildren="浅色"
              checked={isDarkTheme}
              onChange={(e) => {
                setIsDarkTheme(e);
              }}
            ></Switch>
            <Select
              size="small"
              value={chartMockDataType}
              defaultValue="standard"
              className={css`
                width: 150px;
              `}
              options={chartMockDataOptions}
              onChange={(e) => {
                setChartMockDataType(e);
              }}
            />
            <RunBtn
              onClick={() => {
                handleSaveTemplate(template);
              }}
            >
              保存
            </RunBtn>
            <RunBtn
              onClick={() => {
                handleCompileTemplate(template);
              }}
            >
              运行
            </RunBtn>
          </div>
          <div
            className={css`
              width: 100%;
              height: calc(100vh - 80px);
            `}
          >
            <MonacoEditor
              // language="handlebars"
              language="javascript"
              value={template}
              onChange={setTemplate}
              height="100%"
              wordWrap="on"
            />
          </div>
        </div>
      </Spin>

      <ChartEditRight
        chartOption={chartOption}
        chartOptionStr={chartOptionStr}
        setChartOptionStr={setChartOptionStr}
        chartOptionEditorRef={chartOptionEditorRef}
        isDarkTheme={isDarkTheme}
        themeProvider={themeProvider}
      />
    </div>
  );
}

function RunBtn({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={css`
        color: #fff;
        background-color: #409eff;
        min-width: 70px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        ${props.className}
      `}
    >
      {children}
    </div>
  );
}

export default ChartEditPage;
