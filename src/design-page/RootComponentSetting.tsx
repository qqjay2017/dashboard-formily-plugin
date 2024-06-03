import { useForm } from "@formily/react";
import React from "react";

export const RootComponentSetting = () => {
  const form = useForm();
  console.log(form.getFieldState("root"), "form root setting");

  return <div>RootComponentSetting</div>;
};
