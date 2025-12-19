/* eslint-disable prettier/prettier */
import { Button } from "@heroui/button";
import { useId } from "react";

type ColorPickerProps = {
  label: string;
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
};

export default function ColorPicker({
  label,
  value,
  onChange,
  disabled = false,
}: ColorPickerProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label htmlFor={id} className="text-sm font-medium text-foreground-muted">
        {label}
      </label>

      {/* Control */}
      <div
        className={[
          "flex items-center gap-3 rounded-md border px-3 py-2",
          "bg-surface shadow-sm transition",
          "focus-within:ring-2 focus-within:ring-primary/40",
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:border-primary/40",
        ].join(" ")}
      >
        {/* Native picker (hidden but clickable) */}
        <input
          id={id}
          type="color"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="absolute h-0 w-0 opacity-0"
        />

        {/* Color preview */}
        <div
          className="h-8 w-8 rounded-lg border"
          style={{ backgroundColor: value }}
        />

        {/* Value display */}
        <span className="flex-1 text-sm font-mono text-foreground">
          {value.toUpperCase()}
        </span>

        {/* Trigger */}
        <label
          htmlFor={id}
          className={[
            "cursor-pointer select-none rounded-md px-3 py-1 text-sm font-medium",
            "bg-background-muted text-foreground-secondary",
            "hover:bg-background-muted/70",
            disabled && "pointer-events-none",
          ].join(" ")}
        >
          Válassz színt
        </label>

        {/* Delete color button */}
        <Button
          onPress={() => onChange("")}
          isIconOnly
          color="danger"
          size="sm"
          radius="full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
