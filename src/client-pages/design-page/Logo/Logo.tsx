import { css } from "@emotion/css";
import { Space } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { cx } from "@/utils";

const logoStyle = css`
  padding-left: 12px;

  font-size: 16px;
  font-weight: 600;
  color: var(--dn-composite-panel-tabs-header-color);
`;
export function Logo() {
  const navigate = useNavigate();
  return (
    <Space>
      <div
        onClick={(e) => {
          navigate("/dashboard/all");
        }}
        className={cx(
          logoStyle,
          css`
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          `
        )}
      >
        <IoIosArrowBack />
      </div>
      <div className={logoStyle}>大屏可视化设计器</div>
    </Space>
  );
}
