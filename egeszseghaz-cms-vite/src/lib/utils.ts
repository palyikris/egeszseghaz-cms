/* eslint-disable prettier/prettier */
import type { CSSProperties } from "react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ColorResolution = {
  className?: string;
  style?: CSSProperties;
};

/**
 * Resolve a template color value into either a tailwind className fragment
 * (e.g. `text-primary-dark` / `bg-primary`) or an inline style when the value
 * is a hex/rgb/hsl color. Use `kind` to indicate whether you want a text/bg/border
 * style.
 */
export function resolveColor(
  value?: string | null,
  kind: "text" | "bg" | "border" = "text"
): ColorResolution {
  if (!value) return {};

  const isRawColor = /^#|^rgb|^hsl/i.test(value);

  if (isRawColor) {
    if (kind === "text") return { style: { color: value } };

    if (kind === "bg") return { style: { backgroundColor: value } };

    return { style: { borderColor: value } };
  }

  const prefix = kind === "text" ? "text-" : kind === "bg" ? "bg-" : "border-";

  return { className: `${prefix}${value}` };
}
