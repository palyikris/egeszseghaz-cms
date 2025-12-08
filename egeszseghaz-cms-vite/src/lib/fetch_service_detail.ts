/* eslint-disable prettier/prettier */
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function fetchServiceDetailTemplate() {
  try {
    const ref = doc(db, "template", "serviceDetail");
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return { id: snap.id, ...(snap.data() as Record<string, any>) };
  } catch (err) {
    console.error("Error fetching serviceDetail template:", err);
    throw err;
  }
}
