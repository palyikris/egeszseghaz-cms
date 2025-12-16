/* eslint-disable prettier/prettier */
import clsx from "clsx";
import dayjs from "dayjs";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { TimeInput } from "@heroui/date-input";
import { parseDate, Time } from "@internationalized/date";

import { ScheduleEditorModel } from "@/types/schedule_editor";

type Props = {
  value: ScheduleEditorModel;
  onChange: (v: ScheduleEditorModel) => void;
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
};

const DAYS = [
  { label: "Hét", value: 1 },
  { label: "Kedd", value: 2 },
  { label: "Szer", value: 3 },
  { label: "Csüt", value: 4 },
  { label: "Pén", value: 5 },
  { label: "Szom", value: 6 },
  { label: "Vas", value: 0 },
];

function stringToTime(value: string | null): Time | null {
  if (!value) return null;

  const [h, m] = value.split(":").map(Number);

  return new Time(h, m);
}

function timeToString(time: Time | null): string | null {
  if (!time) return null;

  return `${time.hour.toString().padStart(2, "0")}:${time.minute
    .toString()
    .padStart(2, "0")}`;
}

export default function ScheduleEditor({
  value,
  onChange,
  onCancel,
  onSave,
  isSaving = false,
}: Props) {
  const isValid =
    value.weekdays.length > 0 &&
    value.startTime < value.endTime &&
    (!value.endDate || value.startDate <= value.endDate);

  return (
    <div className="space-y-6">
      {/* Weekdays */}
      <div>
        <h2 className="block text-sm font-medium mb-2">A hét napjai:</h2>

        <div className="flex gap-2 flex-wrap">
          {DAYS.map((d) => {
            const active = value.weekdays.includes(d.value);

            return (
              <button
                key={d.value}
                type="button"
                className={clsx(
                  "px-2 py-1 rounded text-sm border transition",
                  active
                    ? "bg-primary text-white border-primary"
                    : "bg-transparent hover:bg-muted"
                )}
                onClick={() => {
                  const next = active
                    ? value.weekdays.filter((day) => day !== d.value)
                    : [...value.weekdays, d.value];

                  onChange({
                    ...value,
                    weekdays: next,
                  });
                }}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time range */}
      <div>
        <h2 className="block text-sm font-medium mb-2">Időpont</h2>

        <div className="grid grid-cols-2 gap-3">
          <TimeInput
            label="Kezdet"
            hourCycle={24}
            value={stringToTime(value.startTime)}
            onChange={(date) =>
              onChange({
                ...value,
                startTime: timeToString(date) || "06:00",
              })
            }
            maxValue={new Time(20)}
            minValue={new Time(6)}
            hideTimeZone
          />

          <TimeInput
            label="Vége"
            hourCycle={24}
            value={stringToTime(value.endTime)}
            onChange={(date) =>
              onChange({
                ...value,
                endTime: timeToString(date) || "18:00",
              })
            }
            maxValue={new Time(22)}
            minValue={new Time(8)}
            hideTimeZone
          />
        </div>
      </div>

      {/* Date range */}
      <div>
        <h3 className="block text-sm font-medium mb-2">Dátum tartomány:</h3>

        <div className="grid grid-cols-2 gap-3">
          <DatePicker
            label="Kezdő dátum"
            value={parseDate(value.startDate)}
            onChange={(date) =>
              onChange({
                ...value,
                startDate: dayjs(date?.toString()).format("YYYY-MM-DD"),
              })
            }
          />

          <DatePicker
            label="Záró dátum"
            value={value.endDate ? parseDate(value.endDate) : undefined}
            onChange={(date) =>
              onChange({
                ...value,
                endDate: date
                  ? dayjs(date.toString()).format("YYYY-MM-DD")
                  : undefined,
              })
            }
            minValue={parseDate(value.startDate)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button
          variant="ghost"
          color="secondary"
          onPress={onCancel}
          isDisabled={isSaving}
        >
          Mégse
        </Button>

        <Button
          color="primary"
          onPress={onSave}
          isDisabled={!isValid}
          isLoading={isSaving}
        >
          Időpont mentése
        </Button>
      </div>
    </div>
  );
}
