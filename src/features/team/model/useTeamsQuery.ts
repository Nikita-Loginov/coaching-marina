import { useQuery } from "@tanstack/react-query";

import { teamApi } from "./team.api";

export const TEAMS_QUERY_KEY = ["admin", "teams"] as const;

export const useTeamsQuery = () =>
  useQuery({
    queryKey: TEAMS_QUERY_KEY,
    queryFn: teamApi.list,
  });

export const useTeamQuery = (id: string | undefined) =>
  useQuery({
    queryKey: [...TEAMS_QUERY_KEY, id],
    queryFn: () => teamApi.get(id as string),
    enabled: Boolean(id),
  });
