/* eslint-disable prettier/prettier */
export interface ThemePalette {
  name: string;
  label: string;
  light: Record<string, string>;
  dark: Record<string, string>;
}

/** Helper: hex → rgb triplets */
export const hexToTriplet = (hex: string): string => {
  const clean = hex.replace("#", "");
  const n = parseInt(clean, 16);
  
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};
