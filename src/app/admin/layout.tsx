import { redirect } from "next/navigation";

import { AdminPanelLayout } from "@/widgets/admin-panel/ui";

import { ReactQueryProvider } from "@/shared/api/react-query/provider";
import { getAdminSession } from "@/shared/lib/admin-session";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <ReactQueryProvider>
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </ReactQueryProvider>
  );
}
