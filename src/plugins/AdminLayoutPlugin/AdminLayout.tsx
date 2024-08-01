import type { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import AdminLayoutContainer from "@/client-pages/components/AdminLayoutContainer";

export function AdminLayout(props: PropsWithChildren) {
  const { pathname } = useLocation();

  if (pathname.includes("/report") || pathname.includes("/dashboard-design")) {
    return props.children;
  }

  return <AdminLayoutContainer>{props.children}</AdminLayoutContainer>;
}
