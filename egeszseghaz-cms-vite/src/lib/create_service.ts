/* eslint-disable prettier/prettier */
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

// create a new service; if `id` is provided, use it as the document ID
export async function createService(
  payload: Record<string, any>,
  id?: string
) {
  if (id) {
    const ref = doc(db, "newreservation", id);

    await setDoc(ref, {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { id, ...payload };
  }

  const ref = collection(db, "newreservation");

  const docRef = await addDoc(ref, {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return { id: docRef.id, ...payload };
}
