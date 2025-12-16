/* eslint-disable prettier/prettier */
import type { EventContentArg } from "@fullcalendar/core";

export function CalendarEventContent(arg: EventContentArg) {
  const { event } = arg;

  const title = event.title;
  const coach = event.extendedProps?.coach;
  const start = event.start;
  const end = event.end;

  const formatDateToHHMM = (date: Date | null): string => {
    if (!date) return "";
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  console.log(title, coach);

  return (
    <div className="px-1 py-0.5 leading-tight">
      <div className="text-xs font-medium truncate">{title.toUpperCase() + " | " + `${formatDateToHHMM(start)}-${formatDateToHHMM(end)}`}</div>

      {coach && <div className="text-[11px] opacity-80 truncate">{coach}</div>}
    </div>
  );
}
