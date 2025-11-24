/* eslint-disable prettier/prettier */

import { NewServiceSchema } from "@/templates/new_service/new_service_schema";
import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";


export async function editNewService(newService: NewServiceSchema) {
  const docRef = doc(db, "template", "newService");

  await updateDoc(docRef, newService as any);
}