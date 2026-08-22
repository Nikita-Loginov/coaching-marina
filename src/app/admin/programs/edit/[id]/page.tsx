import { ProgramAdminForm } from "@/features/program/ui";

interface AdminProgramEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProgramEditPage({
  params,
}: AdminProgramEditPageProps) {
  const { id } = await params;

  return <ProgramAdminForm mode="edit" id={id} />;
}
