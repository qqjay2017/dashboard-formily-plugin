import React from "react";
import { Navigate } from "react-router-dom";

export const NavigateHome = () => {
  return <Navigate to={"/dashboard/home"} />;
};
