/* eslint-disable prettier/prettier */
import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { PageDoc } from "@/types/firebase";

export async function publishDraft(pageId: string, publishedContent: any) {
  const pageRef = doc(db, "template", pageId);
  console.log("Publishing draft for page:", pageId, publishedContent);
  const pageSnap = await updateDoc(pageRef, {
    publishedContent: publishedContent,
    updatedAt: new Date(),
  } as Partial<PageDoc>);

  return pageSnap;
}