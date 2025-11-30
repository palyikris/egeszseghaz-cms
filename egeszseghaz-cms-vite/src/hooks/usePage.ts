/* eslint-disable prettier/prettier */
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

import { PageDoc } from "@/types/firebase";
import { db } from "@/utils/firebase";


export function usePage(id: string) {
  

  return useQuery({
    queryKey: ["page", id],
    queryFn: async () => {
      const ref = doc(db, "template", id);
      const snap = await getDoc(ref);

      if (!snap.exists()) throw new Error("Page not found");

      return { id: snap.id, ...(snap.data() as Omit<PageDoc, "id">) };
    },
  });
}
