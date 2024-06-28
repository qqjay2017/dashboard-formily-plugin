import { css } from "@emotion/css";
import { Button, Space, message } from "antd";
import html2canvas from "html2canvas";

import { useUpdateDashboard } from "../../../hooks/useUpdateDashboard";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { useSchemaOptionsContext } from "@/schema-component/core";
import { get } from "lodash-es";
import { useReportShare } from "@/client-pages/home-list/useReportShare";

export const DesignPageHeader = () => {
  const { reportShare } = useReportShare();
  const { scope } = useSchemaOptionsContext();
  const name = get(scope, "dashboardDt.name");
  const shareURL = get(scope, "dashboardDt.shareURL");
  const navigate = useNavigate();
  const { updateDashboard } = useUpdateDashboard();

  const handleGenThumb = async () => {
    const r = document.getElementById("DashboardRootWrap");
    if (!r) {
      return false;
    }

    // const { width, height } = r.getBoundingClientRect();
    try {
      const canvas = await html2canvas(r, {
        scale: 0.1,
      });

      const data = canvas.toDataURL();
      if (data) {
        await updateDashboard({
          coverThumbnail: data,
        });
        return message.success("生成成功");
      }
      message.error("生成失败");
    } catch (error) {
      console.log(error, "error");
      message.error("生成失败");
    }
  };
  return (
    <div
      className={css`
        width: 100%;
        height: 50px;
        background-color: rgb(24, 24, 28);
        border-bottom: 1px solid rgba(255, 255, 255, 0.09);
        box-sizing: border-box;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          onClick={() => {
            navigate("/dashboard/home");
          }}
          className={css`
            color: #fff;
            font-size: 16px;
            margin-right: 12px;
            line-height: 16px;
            cursor: pointer;
          `}
        >
          <FaArrowLeft />
        </div>
        <div
          className={css`
            cursor: pointer;
            height: 40px;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            color: #fff;
            line-height: 40px;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 230px;
          `}
        >
          {name || "可视化大屏搭建"}
        </div>
      </div>
      <Space>
        <Button
          onClick={() => {
            handleGenThumb();
          }}
        >
          生成封面
        </Button>
        <Button
          type="primary"
          onClick={() => {
            reportShare(shareURL);
          }}
        >
          预览
        </Button>
      </Space>
    </div>
  );
};
