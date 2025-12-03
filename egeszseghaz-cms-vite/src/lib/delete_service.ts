/* eslint-disable prettier/prettier */

import { db } from "@/utils/firebase";

import { deleteDoc, doc } from "firebase/firestore";


export async function deleteService(serviceId: string): Promise<void> {
  const serviceRef = doc(db, "newreservation", serviceId);

  await deleteDoc(serviceRef);

  try {
    const { getStorage, ref, listAll, deleteObject } = await import("firebase/storage");
    const storage = getStorage();

    const deleteFolder = async (path: string): Promise<void> => {
      const folderRef = ref(storage, path);
      const listResult = await listAll(folderRef);

      // delete all files in this folder
      await Promise.all(listResult.items.map((item) => deleteObject(item)));

      // recurse into subfolders
      await Promise.all(listResult.prefixes.map((sub) => deleteFolder(sub.fullPath)));
    };

    await deleteFolder(serviceId);
  } catch (error) {
    console.error("Error deleting storage folder for service:", serviceId, error);
  }
}