/* eslint-disable prettier/prettier */
export type CalendarEvent = {
  id: string; // occurrenceId
  title: string;
  start: string; // ISO
  end: string; // ISO
  serviceId: string;
  scheduleId: string;
};
