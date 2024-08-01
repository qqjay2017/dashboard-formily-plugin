import { css } from "@emotion/css";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export function AppNotFound() {
  const navigate = useNavigate();
  return (
    <Result
      className={css`
        width: 100%;
        height: 100%;
      `}
      status="404"
      title="404"
      subTitle="该页面不存在"
      extra={
        <Button onClick={() => navigate("/", { replace: true })} type="primary">
          返回首页
        </Button>
      }
    />
  );
}
