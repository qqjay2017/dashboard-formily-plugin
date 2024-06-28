import { useRequest } from "@/api-client";
import React from "react";

export const ProjectTypePercent = () => {
  const { data, isLoading } = useRequest("/api/bg/v1/project/type", {
    method: "GET",
  });

  if (isLoading) {
    return null;
  }
  console.log(data, "data");
  return <div>ProjectTypePercent</div>;
};
