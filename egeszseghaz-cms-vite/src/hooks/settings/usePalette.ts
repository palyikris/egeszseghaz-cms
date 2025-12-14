/* eslint-disable prettier/prettier */
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { PALETTES } from "@/palettes/themes";
import { db } from "@/utils/firebase";

export function usePalette() {
  return useQuery({
    queryKey: ["palette"],
    queryFn: async () => {
      const snap = await getDoc(doc(db, "settings", "theme"));
      const name = snap.exists() ? snap.data().activeTheme : "wellness";
      
      return PALETTES.find((p) => p.name === name) ?? PALETTES[0];
    },
  });
}
