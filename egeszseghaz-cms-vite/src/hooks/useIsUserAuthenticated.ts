/* eslint-disable prettier/prettier */
import { useQuery } from "@tanstack/react-query";

import { isAuthenticated } from "@/lib/auth";

export function useIsUserAuthenticated() {
  return useQuery({
    queryKey: ["isUserAuthenticated"],
    queryFn: async () => {
      return isAuthenticated();
    }
  });
}