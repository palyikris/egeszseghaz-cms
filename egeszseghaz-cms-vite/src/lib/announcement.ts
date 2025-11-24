/* eslint-disable prettier/prettier */

import { db } from "@/utils/firebase";
import { AnnouncementSchema } from "@/templates/announcement/announcement_schema";
import { doc, updateDoc } from "firebase/firestore";

export async function editAnnouncement(announcement: AnnouncementSchema) {
  const docRef = doc(db, "template", "announcement");
  
  await updateDoc(docRef, announcement as any);
}