import { useQuery } from "@tanstack/react-query";

import { orgsApi } from "./orgs.api";

export const ORGS_QUERY_KEY = ["admin", "orgs"] as const;

export const useOrgsQuery = () =>
  useQuery({
    queryKey: ORGS_QUERY_KEY,
    queryFn: orgsApi.get,
  });