import { getUserEmail } from "@/shared/lib/auth.server";

import { Breadcrumbs } from "@/shared/ui/index.ui";

import scss from "./AdminPanelHeader.module.scss";

export const AdminPanelHeader = async () => {
  const email = await getUserEmail();

  return (
    <header className={scss["admin-panel-header"]}>
      <Breadcrumbs />
      
      <div className={scss["admin-panel-header__block"]}>{email}</div>
    </header>
  );
};
