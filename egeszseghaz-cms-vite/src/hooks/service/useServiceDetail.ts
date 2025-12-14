/* eslint-disable prettier/prettier */
import { useQuery } from "@tanstack/react-query";
import { fetchServiceDetailTemplate } from "@/lib/service/fetch_service_detail";

export function useServiceDetail() {
  return useQuery({
    queryKey: ["page", "serviceDetail"],
    queryFn: async () => {
      const data = await fetchServiceDetailTemplate();

      if (!data) throw new Error("serviceDetail template not found");

      return data;
    },
  });
}
