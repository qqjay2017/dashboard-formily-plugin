import { Outlet } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { layoutRightContentStyle } from "@/designable/styles";

export default function SystemLayout() {
  return (
    <PageLayout>
      <div className={layoutRightContentStyle}>
        <Outlet />
      </div>
    </PageLayout>
  );
}
