/* eslint-disable prettier/prettier */
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";

import { db } from "@/utils/firebase";
import { createBannerForNewService } from "./banner/create_banner_for_new_service";
import { Service } from "@/types/services";

// create a new service; if `id` is provided, use it as the document ID
export async function createService(payload: Record<string, any>, id?: string) {
  let serviceId: string;

  if (id) {
    const ref = doc(db, "newreservation", id);

    await setDoc(ref, {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    serviceId = id;
  } else {
    const ref = collection(db, "newreservation");

    const docRef = await addDoc(ref, {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    serviceId = docRef.id;
  }

  // Create banner for the new service
  await createBannerForNewService({
    id: serviceId,
    ...payload,
  } as unknown as Service);

  return { id: serviceId, ...payload };
}
