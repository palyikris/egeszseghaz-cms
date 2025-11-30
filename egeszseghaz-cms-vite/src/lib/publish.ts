/* eslint-disable prettier/prettier */
import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { PageDoc } from "@/types/firebase";

export async function publishDraft(pageId: string, publishedContent: any) {
  const pageRef = doc(db, "template", pageId);

  const pageSnap = await updateDoc(pageRef, {
    ...publishedContent,
    updatedAt: new Date(),
  } as Partial<PageDoc>);

  return pageSnap;
}

export async function publishAnnouncement(publishedContent: any) {
  const announcementRef = doc(db, "template", "announcement");
  const announcementSnap = await updateDoc(announcementRef, {
    ...publishedContent,
    updatedAt: new Date(),
  } as Partial<PageDoc>);

  return announcementSnap;
}

export async function publishNewService(publishedContent: any) {
  const serviceRef = doc(db, "template", "newService");
  const serviceSnap = await updateDoc(serviceRef, {
    ...publishedContent,
    updatedAt: new Date(),
  } as Partial<PageDoc>);

  return serviceSnap;
}

export async function publishService(serviceId: string, publishedContent: any) {
  const serviceRef = doc(db, "newreservation", serviceId);
  const serviceSnap = await updateDoc(serviceRef, {
    ...publishedContent,
    updatedAt: new Date(),
  });

  return serviceSnap;
}