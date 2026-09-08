import { useMutation } from "@tanstack/react-query";
import { teamApi } from "./team.api";

export const useReorderTeams = () => {
  return useMutation({
    mutationFn: (
      items: {
        id: string;
        order: number;
      }[]
    ) => teamApi.reorder(items),
  });
};
