import { Button } from "antd";

import { useNavigate } from "react-router-dom";

export function CreateApiBtn() {
  const navigate = useNavigate();
  return (
    <Button
      type="primary"
      onClick={() => {
        navigate("/dapi/edit");
      }}
    >
      新增API
    </Button>
  );
}
