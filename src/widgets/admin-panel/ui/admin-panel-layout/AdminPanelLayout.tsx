import { AdminPanelSidebar } from "../admin-panel-sidebar/AdminPanelSidebar";
import { AdminPanelHeader } from "../admin-panel-header/AdminPanelHeader";

import scss from "./AdminPanelLayout.module.scss";

interface AdminPanelLayoutProps {
  children: React.ReactNode;
}

export const AdminPanelLayout = ({ children }: AdminPanelLayoutProps) => {
  return (
    <div className={scss["admin-panel-layout"]}>
      <AdminPanelSidebar />

      <div className={scss["admin-panel-layout__content"]}>
        <AdminPanelHeader />

        <div className={scss["admin-panel-layout__wrapper"]}>
          <main className="main main--noPt">{children}</main>
        </div>
      </div>
    </div>
  );
};
