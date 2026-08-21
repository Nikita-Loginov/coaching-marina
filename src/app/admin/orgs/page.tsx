import AdminContent from "@/screens/admin";

import { OrgsAdminForm } from "@/features/orgs/ui";

export default function AdminOrgs() {
  return (
    <AdminContent
      title="Информация обо мне"
      text="Управляйте информацией"
      // linkTo="/admin/teams/new"
    >
      <OrgsAdminForm />
    </AdminContent>
  );
}
