/* eslint-disable prettier/prettier */
import { Service } from "@/types/services";
import dayjs from "dayjs";
import { expandWeeklySchedulesForService } from "../service/expand_schedules";


export async function getNextOccurrence(service: Service): Promise<dayjs.Dayjs | null> {
  const now = dayjs();

  let nextOccurrence: dayjs.Dayjs | null = null;

  const occurrences = expandWeeklySchedulesForService(service, now.toISOString(), now.add(1, "year").toISOString());


  for (const occurrence of occurrences) {
    const occurrenceStart = dayjs(occurrence.start);

    if (occurrenceStart.isAfter(now)) {
      if (!nextOccurrence || occurrenceStart.isBefore(nextOccurrence)) {
        nextOccurrence = occurrenceStart;
      }
    }
  }

  if (!nextOccurrence) {
    return null;
  }

  return nextOccurrence;
}