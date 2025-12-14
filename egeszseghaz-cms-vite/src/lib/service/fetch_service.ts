/* eslint-disable prettier/prettier */
import { Service } from "@/types/services";
import { db } from "@/utils/firebase";

import { doc, getDoc } from "firebase/firestore";

export async function fetchServiceById(id: string): Promise<Service | null> {
  try {
    const docRef = doc(db, "newreservation", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      return { id: docSnap.id, ...data as Omit<Service, "id"> };
    } else {
      console.log("Service not found");

      return null;
    }
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
}