/* eslint-disable prettier/prettier */
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

import { Service } from "@/types/services";
import { db } from "@/utils/firebase";




export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const ref = collection(db, "newreservation");

      const snap = getDocs(ref);

      return (await snap).docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Service, "id">),
      }));
    },
  });
}