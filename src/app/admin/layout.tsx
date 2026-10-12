import { redirect } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";

import { AdminPanelLayout } from "@/widgets/admin-panel/ui";

import { auth } from "@clerk/nextjs/server";

import { ReactQueryProvider } from "@/shared/api/react-query/provider";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <ClerkProvider proxyUrl={process.env.NEXT_PUBLIC_CLERK_PROXY_URL}>
      <ReactQueryProvider>
        <AdminPanelLayout>{children}</AdminPanelLayout>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
