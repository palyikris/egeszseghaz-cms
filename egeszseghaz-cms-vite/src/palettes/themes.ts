/* eslint-disable prettier/prettier */
import { ThemePalette } from "./palette";

/** WELLNESS — Original Egészségház palette */
export const wellness: ThemePalette = {
  name: "wellness",
  label: "Wellness Warm (Default)",
  light: {
    primary: "#8E715B",
    primaryLight: "#BFA590",
    primaryDark: "#604A3A",
    secondary: "#4BA6A3",
    secondaryLight: "#7FC9C6",
    secondaryDark: "#2B6E6C",
    accent: "#E6B655",
    background: "#F8F5F1",
    foreground: "#2E2E2E",
    textPrimary: "#2E2E2E",
    textSecondary: "#5C5C5C",
  },
  dark: {
    primary: "#604A3A",
    primaryLight: "#BFA590",
    primaryDark: "#402E21",
    secondary: "#2B6E6C",
    secondaryLight: "#7FC9C6",
    secondaryDark: "#1D4746",
    accent: "#E6B655",
    background: "#1C1C1C",
    foreground: "#F8F5F1",
    textPrimary: "#F8F5F1",
    textSecondary: "#AAAAAA",
  },
};

/** COOL SPA */
export const coolSpa: ThemePalette = {
  name: "cool-spa",
  label: "Cool Spa",
  light: {
    primary: "#3A7CA5",
    primaryLight: "#64A4C8",
    primaryDark: "#26597B",
    secondary: "#49C0B6",
    secondaryLight: "#7ADBD3",
    secondaryDark: "#2F887F",
    accent: "#A5D0E3",
    background: "#F4FAFC",
    foreground: "#1E2A32",
    textPrimary: "#1E2A32",
    textSecondary: "#6A7A86",
  },
  dark: {
    primary: "#26597B",
    primaryLight: "#64A4C8",
    primaryDark: "#1B364B",
    secondary: "#2F887F",
    secondaryLight: "#7ADBD3",
    secondaryDark: "#1C5E58",
    accent: "#7AB4C9",
    background: "#0F161B",
    foreground: "#E6EEF4",
    textPrimary: "#E6EEF4",
    textSecondary: "#95A3AE",
  },
};

/** FOREST GREEN */
export const forest: ThemePalette = {
  name: "forest",
  label: "Forest Green",
  light: {
    primary: "#567D46",
    primaryLight: "#7FA871",
    primaryDark: "#3F5E34",
    secondary: "#8FB996",
    secondaryLight: "#B8D9BF",
    secondaryDark: "#6C8F72",
    accent: "#C4DFAA",
    background: "#F3F7F2",
    foreground: "#1F2A1F",
    textPrimary: "#1F2A1F",
    textSecondary: "#5C6F5C",
  },
  dark: {
    primary: "#3F5E34",
    primaryLight: "#7FA871",
    primaryDark: "#2B4023",
    secondary: "#6C8F72",
    secondaryLight: "#B8D9BF",
    secondaryDark: "#4A694E",
    accent: "#A7C794",
    background: "#0F150F",
    foreground: "#E1EDE1",
    textPrimary: "#E1EDE1",
    textSecondary: "#8FA48F",
  },
};

/** NEUTRAL PRO */
export const neutral: ThemePalette = {
  name: "neutral",
  label: "Neutral Professional",
  light: {
    primary: "#6A6A6A",
    primaryLight: "#9C9C9C",
    primaryDark: "#4A4A4A",
    secondary: "#A0A0A0",
    secondaryLight: "#C7C7C7",
    secondaryDark: "#707070",
    accent: "#D0D0D0",
    background: "#FAFAFA",
    foreground: "#222222",
    textPrimary: "#222222",
    textSecondary: "#666666",
  },
  dark: {
    primary: "#4A4A4A",
    primaryLight: "#9C9C9C",
    primaryDark: "#2D2D2D",
    secondary: "#707070",
    secondaryLight: "#C7C7C7",
    secondaryDark: "#4A4A4A",
    accent: "#9C9C9C",
    background: "#111111",
    foreground: "#EDEDED",
    textPrimary: "#EDEDED",
    textSecondary: "#AAAAAA",
  },
};

/** VIBRANT ENERGY */
export const vibrant: ThemePalette = {
  name: "vibrant",
  label: "Vibrant Orange",
  light: {
    primary: "#E26D39",
    primaryLight: "#FFA87A",
    primaryDark: "#A9491C",
    secondary: "#FF9F1C",
    secondaryLight: "#FFBE6D",
    secondaryDark: "#C57800",
    accent: "#FFD079",
    background: "#FFF7F3",
    foreground: "#3D2A1F",
    textPrimary: "#3D2A1F",
    textSecondary: "#7A5A45",
  },
  dark: {
    primary: "#A9491C",
    primaryLight: "#FFA87A",
    primaryDark: "#6F2C0C",
    secondary: "#C57800",
    secondaryLight: "#FFBE6D",
    secondaryDark: "#8E5500",
    accent: "#EAB660",
    background: "#1A120E",
    foreground: "#FAEDE2",
    textPrimary: "#FAEDE2",
    textSecondary: "#B89D8A",
  },
};

/** Registry */
export const PALETTES: ThemePalette[] = [
  wellness,
  coolSpa,
  forest,
  neutral,
  vibrant,
];
