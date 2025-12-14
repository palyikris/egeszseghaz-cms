/* eslint-disable prettier/prettier */
import { useQuery } from "@tanstack/react-query";
import { NewServiceSchema } from "@/templates/new_service/new_service_schema";
import { fetchNewService } from "@/lib/banner/new_service";

export function useNewService() {
  return useQuery<NewServiceSchema | null>(
    {
      queryKey: ["newService"],
      queryFn: fetchNewService,
      
    }
  );
}