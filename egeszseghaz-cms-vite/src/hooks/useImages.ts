/* eslint-disable prettier/prettier */
import { getImagesFromFirebase } from "@/lib/media";
import { useQuery } from "@tanstack/react-query";


export function useImages() {
  return useQuery({
    queryKey: ["images"],
    queryFn: () => getImagesFromFirebase(),
  })
}