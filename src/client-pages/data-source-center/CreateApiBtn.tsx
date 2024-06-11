import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export const CreateApiBtn = () => {
  const navigate = useNavigate();
  return (
    <Button
      type="primary"
      onClick={() => {
        navigate("/dashboard/api/edit");
      }}
    >
      新增API
    </Button>
  );
};
