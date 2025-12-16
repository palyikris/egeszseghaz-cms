/* eslint-disable prettier/prettier */
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

import { useCalendarWeek } from "@/hooks/calendar/useCalendarWeek";
import { mapOccurrencesToEvents } from "@/lib/settings/map_occurances_to_events";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { fullCalendarBaseConfig } from "@/utils/fullCalendarConfig";
import { CalendarEventContent } from "@/components/calendar/CalendarEventContent";
import CustomLoader from "@/components/loader";


dayjs.extend(isoWeek);

export default function WeeklyServicesCalendar() {
  const navigate = useNavigate();

  // anchor week = ISO Monday
  const [weekStartISO, setWeekStartISO] = useState(
    dayjs().startOf("isoWeek").format("YYYY-MM-DD")
  );

  const { occurrences, isLoading, services } = useCalendarWeek(weekStartISO);

  const events = useMemo(() => {
    return mapOccurrencesToEvents(occurrences, services || []);
  }, [occurrences]);

  // navigation bounds: ±4 weeks from current week
  const minWeek = dayjs().startOf("isoWeek").subtract(4, "week");
  const maxWeek = dayjs().startOf("isoWeek").add(4, "week");

  const canGoPrev = dayjs(weekStartISO).isAfter(minWeek);
  const canGoNext = dayjs(weekStartISO).isBefore(maxWeek);

  function goPrevWeek() {
    if (!canGoPrev) return;
    setWeekStartISO(
      dayjs(weekStartISO).subtract(1, "week").format("YYYY-MM-DD")
    );
  }

  function goNextWeek() {
    if (!canGoNext) return;
    setWeekStartISO(dayjs(weekStartISO).add(1, "week").format("YYYY-MM-DD"));
  }

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={goPrevWeek}
          disabled={!canGoPrev}
          className="px-3 py-1 rounded border disabled:opacity-40"
        >
          ← Előző hét
        </button>

        <div className="font-medium">
          {dayjs(weekStartISO).format("YYYY. MMM D.")} –{" "}
          {dayjs(weekStartISO).add(6, "day").format("MMM D.")}
        </div>

        <button
          onClick={goNextWeek}
          disabled={!canGoNext}
          className="px-3 py-1 rounded border disabled:opacity-40"
        >
          Következő hét →
        </button>
      </div>

      {/* Calendar */}
      <div className="relative">
        <FullCalendar
          plugins={[timeGridPlugin]}
          {...fullCalendarBaseConfig}
          initialDate={weekStartISO}
          events={events}
          eventContent={CalendarEventContent}
          dayCellClassNames={(arg) => {
            const d = arg.date.getDay(); // 0 = Sun, 6 = Sat

            if (d === 0 || d === 6) return ["fc-weekend-closed"];

            return [];
          }}
          locale="hu"
          dayHeaderContent={(arg) => {
            const isWeekend =
              arg.date.getDay() === 0 || arg.date.getDay() === 6;

            return (
              <div className="flex flex-col items-center">
                <span>{arg.text}</span>
                {isWeekend && (
                  <span className="text-xs text-muted-foreground">Zárva</span>
                )}
              </div>
            );
          }}
          eventClick={(info) => {
            const serviceId = info.event.extendedProps.serviceId;

            if (serviceId) {
              navigate(`/service/${serviceId}`);
            }
          }}
        />

        {isLoading && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <CustomLoader />
          </div>
        )}
      </div>
    </div>
  );
}
