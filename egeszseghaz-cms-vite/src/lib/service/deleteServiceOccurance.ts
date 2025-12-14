/* eslint-disable prettier/prettier */
import { ServiceSchedule } from "@/types/services";
import { db } from "@/utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { applyDeleteOccurrence } from "./applyDeleteOccurance";


export async function deleteServiceOccurrence(
  serviceId: string,
  scheduleId: string,
  occurrenceId: string
) {
  const ref = doc(db, "newreservation", serviceId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("Service not found");
  }

  const data = snap.data();
  const schedules: ServiceSchedule[] = data.schedules ?? [];

  const updatedSchedules = applyDeleteOccurrence(
    schedules,
    scheduleId,
    occurrenceId
  );

  await updateDoc(ref, {
    schedules: updatedSchedules,
  });
}
