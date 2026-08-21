import { TeamAdminForm } from "@/features/team/ui";

interface AdminTeamEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminTeamEditPage({
  params,
}: AdminTeamEditPageProps) {
  const { id } = await params;

  return <TeamAdminForm mode="edit" id={id} />;
}
