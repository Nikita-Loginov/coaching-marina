"use client";

import { useProgramsQuery } from "../../model/useProgramQuery";
import { useDeleteProgram } from "../../model/useProgramMutations";

import { ProgramCard } from "@/entities/program/ui";

import { AdminItems } from "@/screens/admin";

export const ProgramAdminList = () => {
  const { data: programs, isLoading } = useProgramsQuery();
  const deleteProgram = useDeleteProgram();

  if (isLoading) return <p>Загрузка программ...</p>;

  if (!programs || programs.length === 0) {
    return <p className="p2">Программ пока нет</p>;
  }

  return (
    <AdminItems>
      {programs.length > 0 ? (
        <>
          {programs.map((program) => {
            return (
              <ProgramCard
                key={program.id}
                card={{ ...program }}
                variant="admin"
                onDelete={(id) => {
                  deleteProgram.mutate(id)
                }}
                deleteStatus={{
                  isPending: deleteProgram.isPending,
                  id: deleteProgram.variables,
                }}
              />
            );
          })}
        </>
      ) : null}
    </AdminItems>
  );
};
