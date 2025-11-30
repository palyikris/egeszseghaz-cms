/* eslint-disable prettier/prettier */

import { storage } from "@/utils/firebase";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

export interface ImageInfo {
  name: string;
  url: string;
}

// Folder name example: "images/products"
export async function getImagesFromFirebase(): Promise<ImageInfo[]> {
  const folderRef = ref(storage, "media");
  const result = await listAll(folderRef);

  const urlsWithNames = await Promise.all(
    result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);

      return { name: itemRef.name, url };
    })
  );

  return urlsWithNames;
}

export async function uploadImageToFirebase(file: File): Promise<ImageInfo> {
  // create a unique name to avoid collisions
  const timestamp = Date.now();
  const name = `${timestamp}_${file.name}`;
  const fileRef = ref(storage, `media/${name}`);

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return { name, url };
}

export async function deleteImageFromFirebase(name: string): Promise<void> {
  const fileRef = ref(storage, `media/${name}`);
  await deleteObject(fileRef);
}
