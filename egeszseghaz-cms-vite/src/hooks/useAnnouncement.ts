/* eslint-disable prettier/prettier */
import { useQuery } from "@tanstack/react-query";
import { fetchAnnouncement } from "@/lib/announcement";


export function useAnnouncement() {
  return useQuery({
    queryKey: ["announcement"],
    queryFn: fetchAnnouncement,
  });
}