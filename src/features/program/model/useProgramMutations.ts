import { useMutation, useQueryClient } from "@tanstack/react-query";

import { programApi } from "./program.api";

import { PROGRAMS_QUERY_KEY } from "./useProgramQuery";

import type { ProgramFormValues } from "@/entities/program/model/program.schema";

export const useCreateProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProgramFormValues) => programApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROGRAMS_QUERY_KEY,
      });
    },
  });
};

export const useUpdateProgram = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProgramFormValues) => programApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROGRAMS_QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: [...PROGRAMS_QUERY_KEY, id],
      });
    },
  });
};

export const useDeleteProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => programApi.remove(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROGRAMS_QUERY_KEY,
      });
    },
  });
};
