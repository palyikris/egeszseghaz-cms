/* eslint-disable prettier/prettier */

import { NewServiceSchema } from "@/templates/new_service/new_service_schema";
import { db } from "@/utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function editNewService(newService: NewServiceSchema) {
  const docRef = doc(db, "template", "newService");

  await updateDoc(docRef, newService as any);
}

export async function fetchNewService(): Promise<NewServiceSchema | null> {
  const docRef = doc(db, "template", "newService");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as NewServiceSchema;
  } else {
    return null;
  }
}