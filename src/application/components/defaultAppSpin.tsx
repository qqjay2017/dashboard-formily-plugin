import { Spin } from "antd";

export const AppSpin = () => {
  return (
    <Spin
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        fontSize: 72,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};
