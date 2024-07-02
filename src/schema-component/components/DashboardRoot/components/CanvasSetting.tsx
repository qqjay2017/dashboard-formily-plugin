// import React, { useEffect } from "react";

import { ConfigProvider, Select, Slider } from "antd";
import { css } from "@emotion/css";

import { useDashboardRoot } from "../hooks";
import { useDesignPageConext } from "../context";

export const CanvasSetting = ({
  handleViewPortFit,
}: {
  handleViewPortFit: () => void;
}) => {
  const { designWidth } = useDashboardRoot();
  const { designZoom, setDesignZoom } = useDesignPageConext();
  const zoomFormatter = (designZoom) => `${(designZoom * 100).toFixed(0)}%`;
  const fitZoom = () => {
    const viewPort = document.getElementById("viewPort");
    if (!viewPort) {
      return false;
    }

    setDesignZoom(
      Math.min(viewPort.getBoundingClientRect().width / designWidth, 1)
    );
    setTimeout(() => {
      handleViewPortFit && handleViewPortFit();
    }, 0);
  };

  // useEffect(() => {
  //   fitZoom();
  // }, []);
  return (
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            railBg: "rgba(255, 255, 255, 0.2)",
          },
        },
      }}
    >
      <div
        className={css`
          z-index: 10;
          position: absolute;
          width: 100%;
          height: 41px;
          left: 0;
          bottom: 0;
          background-color: #232324;
          border-color: #373739;
          border-top: 1px solid #373739;
        `}
      >
        <div
          className={css`
            position: relative;
            width: 100%;
            height: 100%;
            padding: 0 16px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          `}
        >
          <div
            className={css`
              width: 100px;
              margin-right: 16px;
            `}
          >
            <Select
              onSelect={(e) => {
                if (e === "fit") {
                  fitZoom();
                  return;
                }
                if (typeof e === "number") {
                  setDesignZoom(e);
                }
              }}
              style={{
                width: "100%",
              }}
              value={zoomFormatter(designZoom)}
              size="small"
              options={[
                {
                  label: "100%",
                  value: 1,
                },
                {
                  label: "75%",
                  value: 0.75,
                },
                {
                  label: "50%",
                  value: 0.5,
                },
                {
                  label: "25%",
                  value: 0.25,
                },
                {
                  label: "自适应",
                  value: "fit",
                },
              ]}
            />
          </div>
          <div
            className={css`
              width: 100px;
            `}
          >
            <Slider
              step={0.01}
              value={designZoom}
              min={0}
              max={1}
              tooltip={{
                formatter: zoomFormatter,
              }}
              onChange={(e) => {
                setDesignZoom(e);
              }}
              onChangeComplete={(e) => {
                setDesignZoom(e);
              }}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
