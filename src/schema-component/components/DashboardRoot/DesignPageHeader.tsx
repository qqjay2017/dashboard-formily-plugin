import { css } from "@emotion/css";
import { Button, message } from "antd";
import html2canvas from "html2canvas";

import { useUpdateDashboard } from "../../hooks/useUpdateDashboard";

export const DesignPageHeader = () => {
  const { updateDashboard } = useUpdateDashboard();

  const handleGenThumb = async () => {
    const canvas = await html2canvas(document.getElementById("DashboardRoot"), {
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
        可视化大屏搭建
      </div>
      <div>
        <Button
          type="primary"
          onClick={() => {
            handleGenThumb();
          }}
        >
          生成封面
        </Button>
      </div>
    </div>
  );
};
