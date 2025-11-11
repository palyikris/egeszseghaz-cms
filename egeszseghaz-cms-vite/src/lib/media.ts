/* eslint-disable prettier/prettier */

import { storage } from "@/utils/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";

interface ImageInfo {
  name: string;
  url: string;
}

// Folder name example: "images/products"
export async function getImagesFromFirebase(): Promise<ImageInfo[]> {


  const folderRef = ref(storage, "media");
  const result = await listAll(folderRef);

  const urlsWithNames = await Promise.all(
    result.items.map(async(itemRef) => {
      const url = await getDownloadURL(itemRef);

      return { name: itemRef.name, url };
    })
  );

  return urlsWithNames;
}
