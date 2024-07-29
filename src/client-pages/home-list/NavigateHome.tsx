import React from "react";
import { Navigate } from "react-router-dom";

function NavigateHome() {
  return <Navigate to="/home/main" />;
}

export default NavigateHome;
