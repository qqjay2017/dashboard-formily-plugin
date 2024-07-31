import type { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "@/client-pages/components/DashboardLayout";

export function AdminLayout(props: PropsWithChildren) {
  const { pathname } = useLocation();

  if (pathname.includes("/report") || pathname.includes("/dashboard-design")) {
    return props.children;
  }

  return <DashboardLayout>{props.children}</DashboardLayout>;
}
