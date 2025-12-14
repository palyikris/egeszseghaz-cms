/* eslint-disable prettier/prettier */

import { db } from "@/utils/firebase";
import { AnnouncementSchema } from "@/templates/announcement/announcement_schema";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function editAnnouncement(announcement: AnnouncementSchema) {
  const docRef = doc(db, "template", "announcement");

  await updateDoc(docRef, announcement as any);
}

export async function fetchAnnouncement(): Promise<AnnouncementSchema | null> {
  const docRef = doc(db, "template", "announcement");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as AnnouncementSchema;
  } else {
    return null;
  }
}