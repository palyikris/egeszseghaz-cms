/* eslint-disable prettier/prettier */
import { useEffect, useMemo, useState } from "react";
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
import { usePalette } from "@/hooks/settings/usePalette";
import { Button } from "@heroui/button";
import { Service } from "@/types/services";

dayjs.extend(isoWeek);

type WeeklyServicesCalendarProps = {
  services: Service[];
};

export default function WeeklyServicesCalendar({
  services,
}: WeeklyServicesCalendarProps) {
  const navigate = useNavigate();

  const [isSwitchingWeek, setIsSwitchingWeek] = useState(false);

  // anchor week = ISO Monday
  const [weekStartISO, setWeekStartISO] = useState(
    dayjs().startOf("isoWeek").format("YYYY-MM-DD")
  );

  const { occurrences } = useCalendarWeek({
    weekStartISO,
    services,
  });
  const { data: fetchedPalette, isLoading: paletteLoading } = usePalette();

  const palette = useMemo(() => {
    if (paletteLoading || !fetchedPalette) return null;

    return fetchedPalette;
  }, [fetchedPalette, paletteLoading]);

  const events = useMemo(() => {
    if (!palette) return [];
    return mapOccurrencesToEvents(occurrences, services || [], palette);
  }, [occurrences, services, palette]);

  // navigation bounds: ±4 weeks from current week
  const minWeek = dayjs().startOf("isoWeek").subtract(4, "week");
  const maxWeek = dayjs().startOf("isoWeek").add(4, "week");

  const canGoPrev = dayjs(weekStartISO).isAfter(minWeek);
  const canGoNext = dayjs(weekStartISO).isBefore(maxWeek);

  function goPrevWeek() {
    if (!canGoPrev) return;
    setIsSwitchingWeek(true);
    setWeekStartISO(
      dayjs(weekStartISO).subtract(1, "week").format("YYYY-MM-DD")
    );
  }

  function goNextWeek() {
    if (!canGoNext) return;
    setIsSwitchingWeek(true);
    setWeekStartISO(dayjs(weekStartISO).add(1, "week").format("YYYY-MM-DD"));
  }

  useEffect(() => {
    setTimeout(() => {
      setIsSwitchingWeek(false);
    }, 200);
  }, [weekStartISO]);

  // Show a lightweight loader until palette is ready to avoid
  // first-render null issues and empty calendar
  if (paletteLoading || !palette) {
    return (
      <div className="w-full flex items-center justify-center py-6">
        <CustomLoader />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          onPress={goPrevWeek}
          disabled={!canGoPrev}
          className="px-3 py-1 rounded border disabled:opacity-40"
          variant="ghost"
          color="secondary"
        >
          ← Előző hét
        </Button>

        <div className="font-medium">
          {dayjs(weekStartISO).format("YYYY. MMM D.")} –{" "}
          {dayjs(weekStartISO).add(6, "day").format("MMM D.")}
        </div>

        <Button
          onPress={goNextWeek}
          disabled={!canGoNext}
          className="px-3 py-1 rounded border disabled:opacity-40"
          variant="ghost"
          color="secondary"
        >
          Következő hét →
        </Button>
      </div>

      {/* Calendar */}
      <div className="relative">
        <FullCalendar
          plugins={[timeGridPlugin]}
          key={weekStartISO} // force rerender on week change
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

        {isSwitchingWeek && (
          <div className="absolute inset-0 bg-background flex items-center justify-center w-full h-full bg-opacity-70 z-100">
            <CustomLoader />
          </div>
        )}
      </div>
    </div>
  );
}
