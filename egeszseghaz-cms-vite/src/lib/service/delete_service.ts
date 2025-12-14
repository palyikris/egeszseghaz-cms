/* eslint-disable prettier/prettier */

import { db } from "@/utils/firebase";

import { deleteDoc, doc } from "firebase/firestore";
import { createAnnouncementOnServDelete } from "../banner/create_announcement_on_serv_delete";
import { editNewService, fetchNewService } from "../banner/new_service";


export async function deleteService(serviceId: string): Promise<void> {
  const serviceRef = doc(db, "newreservation", serviceId);

  await deleteDoc(serviceRef);

  try {
    const { getStorage, ref, listAll, deleteObject } = await import(
      "firebase/storage"
    );
    const storage = getStorage();

    const deleteFolder = async (path: string): Promise<void> => {
      const folderRef = ref(storage, path);
      const listResult = await listAll(folderRef);

      // delete all files in this folder
      await Promise.all(listResult.items.map((item) => deleteObject(item)));

      // recurse into subfolders
      await Promise.all(
        listResult.prefixes.map((sub) => deleteFolder(sub.fullPath))
      );
    };

    await deleteFolder(serviceId);

    await createAnnouncementOnServDelete(serviceId);

    const new_service = await fetchNewService();

    if (
      new_service &&
      new_service.isDisplayed &&
      new_service.primaryButton?.href
    ) {
      if (new_service.primaryButton.href.includes(`/services/${serviceId}`)) {
        const updatedSchema = {
          ...new_service,
          isDisplayed: false,
        };

        await editNewService(updatedSchema);
      }
    }
  } catch (error) {
    console.error(
      "Error deleting storage folder for service:",
      serviceId,
      error
    );
  }
}