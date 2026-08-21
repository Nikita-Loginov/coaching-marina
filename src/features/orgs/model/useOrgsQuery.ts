import { useMutation, useQueryClient } from "@tanstack/react-query";

import { orgsApi } from "./orgs.api";

import { ORGS_QUERY_KEY } from "./useOrgsMutations";

import type { PersonFormValues } from "@/entities/person/model/person.schema";

export const useUpdateOrgs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PersonFormValues) => orgsApi.update(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ORGS_QUERY_KEY,
      });
    },
  });
};
