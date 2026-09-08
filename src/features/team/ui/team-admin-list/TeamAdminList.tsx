"use client";

import { useTeamsQuery } from "../../model/useTeamsQuery";
import { useReorderTeams } from "../../model/useReorderTeams";
import { useDeleteTeam } from "../../model/useTeamMutations";

import { SortableAdminList } from "@/screens/admin/ui/sortable-admin-list/SortableAdminList";

import { SortableTeamCard } from "../sortable-team-card/SortableTeamCard";

import type { TeamItem } from "@/entities/team/model/team.types";


export const TeamAdminList = () => {
  const { data: teams, isLoading } = useTeamsQuery();
  const deleteTeam = useDeleteTeam();
  const reorderTeams = useReorderTeams();

  if (isLoading) return <p>Загрузка команды...</p>;

  if (!teams || teams.length === 0) {
    return <p className="p2">Команды пока нет</p>;
  }

  return <SortableAdminList<TeamItem>
  items={teams}
  onReorder={(items) => {
    reorderTeams.mutate(items);
  }}
  renderItem={(team) => (
    <SortableTeamCard
      key={team.id}
      team={team}
      onDelete={(id) => deleteTeam.mutate(id)}
      deleteStatus={{
        isPending: deleteTeam.isPending,
        id: deleteTeam.variables,
      }}
    />
  )}
/>

  // return (
  //   <AdminItems>
  //     {teams.length > 0 ? (
  //       <>
  //         {teams.map((team) => {
  //           return (
  //             <TeamCard
  //               key={team.id}
  //               card={{ ...team }}
  //               variant="admin"
  //               onDelete={(id) => {
  //                 deleteTeam.mutate(id)
  //               }}
  //               deleteStatus={{
  //                 isPending: deleteTeam.isPending,
  //                 id: deleteTeam.variables,
  //               }}
  //             />
  //           );
  //         })}
  //       </>
  //     ) : null}
  //   </AdminItems>
  // );
};
