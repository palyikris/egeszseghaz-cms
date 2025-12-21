/* eslint-disable prettier/prettier */
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";

import type {
  Service,
  ServiceSchedule,
} from "@/types/services";
import { getOccurrencesForDate } from "@/lib/service/get_occurances_for_day";
import { applyDeleteOccurrence } from "@/lib/service/applyDeleteOccurance";
import { parseDate } from '@internationalized/date';
import { hasAvailableOccurrenceOnDate } from "@/lib/service/has_available_occurance_for_date";

type Props = {
  open: boolean;
  service: Service | null;
  isSaving?: boolean;
  onClose: () => void;
  onSave: (updatedSchedules: ServiceSchedule[]) => void;
};


export default function AddScheduleExceptionModal({
  open,
  service,
  isSaving,
  onClose,
  onSave,
}: Props): JSX.Element | null {
  const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [selectedOccurrenceId, setSelectedOccurrenceId] = useState<
    string | null
  >(null);
  const [reason, setReason] = useState("");


  const occurrences = useMemo(() => {
    if (!service || !date) return [];

    return getOccurrencesForDate(service, date);
  }, [service, date]);

  useEffect(() => {
    if (!open) {
      setDate(dayjs().format("YYYY-MM-DD"));
      setSelectedOccurrenceId(null);
      setReason("");
    }
  }, [open]);

  function handleSave() {
    if (!service || !selectedOccurrenceId) return;

    const occurrence = occurrences.find(
      (o) => o.occurrenceId === selectedOccurrenceId
    );

    if (!occurrence) return;

    const updatedSchedules = applyDeleteOccurrence(
      service.schedules ?? [],
      occurrence.scheduleId,
      occurrence.occurrenceId,
      reason
    );

    onSave(updatedSchedules);
  }


  return (
    <Modal isOpen={open} onClose={onClose} size="md">
      <ModalContent>
        <ModalHeader>Időpont törlése</ModalHeader>

        <ModalBody className="space-y-4">
          <DatePicker
            label="Dátum"
            value={parseDate(date || "")}
            onChange={(d) => {
              setDate(d?.toString() || "");
              setSelectedOccurrenceId(null);
            }}
            isDateUnavailable={(calendarDate) => {
              if (!service) return true;
              
              return !hasAvailableOccurrenceOnDate(service, calendarDate);
            }}
            firstDayOfWeek="mon"
          />

          {date && occurrences.length === 0 && (
            <p className="text-sm opacity-60">Nincs időpont ezen a napon.</p>
          )}

          {occurrences.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Válassz időpontot:</p>

              <div className="flex flex-col gap-2">
                {occurrences.map((o) => {
                  const selected = o.occurrenceId === selectedOccurrenceId;

                  return (
                    <Button
                      key={o.occurrenceId}
                      variant={selected ? "solid" : "bordered"}
                      color="primary"
                      onPress={() => setSelectedOccurrenceId(o.occurrenceId)}
                    >
                      {dayjs(o.start).format("HH:mm")} –{" "}
                      {dayjs(o.end).format("HH:mm")}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          <Input
            label="Megjegyzés (opcionális)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Mégse
          </Button>

          <Button
            color="danger"
            onPress={handleSave}
            isDisabled={!selectedOccurrenceId}
            isLoading={isSaving}
          >
            Időpont törlése
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
