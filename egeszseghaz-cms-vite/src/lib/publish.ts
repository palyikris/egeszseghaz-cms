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