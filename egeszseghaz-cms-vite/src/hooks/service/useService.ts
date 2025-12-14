/* eslint-disable prettier/prettier */
import { useQuery } from "@tanstack/react-query";
import { fetchServiceById } from "@/lib/service/fetch_service";


type ServiceVariables = {
  serviceId: string;
};

export function useService({ serviceId }: ServiceVariables) {
  return useQuery({
    queryKey: ["service", serviceId],
    queryFn: async () => {
      return await fetchServiceById(serviceId);
    },
  });
}