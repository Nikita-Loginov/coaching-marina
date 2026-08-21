import { useMutation, useQueryClient } from "@tanstack/react-query";

import { teamApi } from "./team.api";
import { TEAMS_QUERY_KEY } from "./useTeamsQuery";

import type { TeamFormValues } from "@/entities/team/model/team.schema";

export const useCreateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TeamFormValues) => teamApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAMS_QUERY_KEY });
    },
  });
};

export const useUpdateTeam = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TeamFormValues) => teamApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAMS_QUERY_KEY });
    },
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => teamApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAMS_QUERY_KEY });
    },
  });
};
