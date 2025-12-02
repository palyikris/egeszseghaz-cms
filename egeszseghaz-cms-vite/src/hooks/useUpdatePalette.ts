/* eslint-disable prettier/prettier */
import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, setDoc } from "firebase/firestore";
import { PALETTES } from "@/palettes/themes";

export function useUpdatePalette() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      await setDoc(doc(db, "settings", "theme"), {
        activeTheme: name,
      });
    },
    // Optimistically update the local palette immediately so the UI reflects
    // the change without waiting for the network roundtrip. Roll back on
    // error and revalidate when settled.
    onMutate: async (name: string) => {
      await qc.cancelQueries({ queryKey: ["palette"] });
      const previous = qc.getQueryData(["palette"]);
      const newPalette = PALETTES.find((p) => p.name === name) ?? PALETTES[0];
      qc.setQueryData(["palette"], newPalette);
      return { previous };
    },
    onError: (_err, _variables, context: any) => {
      if (context?.previous) {
        qc.setQueryData(["palette"], context.previous);
      }
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["palette"] }),
  });
}
