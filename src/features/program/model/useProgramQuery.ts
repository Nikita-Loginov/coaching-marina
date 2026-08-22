import { useQuery } from "@tanstack/react-query";

import { programApi } from "./program.api";

export const PROGRAMS_QUERY_KEY = ["admin", "programs"] as const;

export const useProgramsQuery = () =>
  useQuery({
    queryKey: PROGRAMS_QUERY_KEY,
    queryFn: programApi.list,
  });

export const useProgramQuery = (id: string | undefined) =>
  useQuery({
    queryKey: [...PROGRAMS_QUERY_KEY, id],

    queryFn: () => programApi.get(id as string),

    enabled: Boolean(id),
  });
