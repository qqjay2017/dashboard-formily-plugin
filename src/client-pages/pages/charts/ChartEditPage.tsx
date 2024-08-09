import { useParams } from "react-router-dom";

import { css } from "@emotion/css";
import React, { useEffect, useRef, useState } from "react";
import { Select, Spin, Switch, message } from "antd";
import Handlebars from "handlebars";
import * as echarts from "echarts";

import { defaultChartTemplate } from "./consts";

import { chartMockData, chartMockDataOptions } from "./chartMockData";
import { ChartEditRight } from "./ChartEditRight";

import { useEditChartApi } from "./useEditChartApi";
import { useAPIClient } from "@/api-client";
import { apiBase, chartListDataFormat } from "@/utils";
import { useApp } from "@/application/hooks";
import { useCustomThemeToken } from "@/dashboard-themes";
import { useToken } from "@/schema-component/antd/style";

import { htmlImgUtil } from "@/utils/htmlImgUtil";
import type { MonacoEditorHandles } from "@/schema-component/components/MonacoEditor";
import MonacoEditor from "@/schema-component/components/MonacoEditor";
import { defaultMessage } from "@/utils/defaultMessage";
import { chartHelps } from "@/utils/chartHelps";

function ChartEditPage() {
  const { token: antdToken } = useToken();
  const chartOptionEditorRef = useRef<MonacoEditorHandles>(null);
  const app = useApp();
  const editChartApi = useEditChartApi();
  const apiClient = useAPIClient();
  const { id } = useParams();
  const [spinning, setSpinning] = useState(false);
  const [chartMockDataType, setChartMockDataType] = useState("standard");
  const [themeProvider, setThemeName] = useState("technologyBlue");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [content, setTemplate] = useState("");
  const [chartOption, setChartOption] = useState(null);
  const [chartOptionStr, setChartOptionStr] = useState("");
  const { token: customThemeToken } = useCustomThemeToken({
    isDarkTheme,
    themeProvider,
  });
  const handleCompileTemplate = (content = "", mockDataType = "") => {
    if (!content) {
      app.message.warning("图表模版内容为空,请输入");
      return false;
    }
    try {
      const handlebarsTemplate = Handlebars.compile(content);
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
            ...chartHelps,
            totalNum,
          }
        ) || {};
      setChartOption(c);
      setChartOptionStr(JSON.stringify(c));
      setTimeout(() => {
        chartOptionEditorRef.current?.formatDocument();
      }, 200);
      return content;
    } catch (error) {
      console.error(error);
      setSpinning(false);
      app.message.error("代码执行失败");
    }
  };
  async function save(newTemp) {
    try {
      const imgSrc = await htmlImgUtil({
        element: "ChartViewCore",
      });

      await editChartApi({
        isCreate: false,
        chartId: id,
        values: {
          id,
          coverThumbnail: imgSrc?.fileSrcUrl || undefined,
          content: newTemp,
        },
      });

      setSpinning(false);
      message.success(defaultMessage.submit);
    } catch (error) {
      console.error(error, "error");
      setSpinning(false);
    }
  }
  const handleSaveTemplate = async (temp) => {
    try {
      const newTemp = await handleCompileTemplate(temp);
      if (!newTemp) {
        setSpinning(false);
        return false;
      }

      setSpinning(true);
      setTimeout(async () => {
        try {
          save(newTemp);
        } catch (error) {
          setSpinning(false);
        }
      }, 1500);
    } catch (error) {
      console.error(error, "handleSaveTemplate");
      setSpinning(false);
    }
  };

  useEffect(() => {
    apiClient
      .request({
        url: `${apiBase}/chart/${id}`,
      })
      .then((res) => {
        const chartDt = res || {};
        const type = chartDt.type;
        const isPie = type === "pie";
        if (isPie) {
          setChartMockDataType("pieData");
        }

        const content = chartDt.content || defaultChartTemplate;
        setTemplate(content);
        handleCompileTemplate(content, isPie ? "pieData" : "");
      });
  }, [id]);

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
                handleSaveTemplate(content);
              }}
            >
              保存
            </RunBtn>
            <RunBtn
              onClick={() => {
                handleCompileTemplate(content);
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
              value={content}
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
