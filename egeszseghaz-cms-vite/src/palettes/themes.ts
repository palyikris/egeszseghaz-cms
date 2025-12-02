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
    primary: "#8E715B",
    primaryLight: "#BFA590",
    primaryDark: "#604A3A",

    secondary: "#4BA6A3",
    secondaryLight: "#7FC9C6",
    secondaryDark: "#2B6E6C",

    accent: "#E6B655",

    background: "#1E1C19",
    foreground: "#F3EDE6",

    textPrimary: "#F3EDE6",
    textSecondary: "#C7C1BC",
  },
};

export const urbanOnyx: ThemePalette = {
  name: "urban-onyx",
  label: "Urban Onyx",
  light: {
    primary: "#4A7E88", // Deep blue-green, modern, elegant
    primaryLight: "#8EBBC3", // Soft minty teal
    primaryDark: "#31575E", // Onyx teal

    secondary: "#6A607F", // Smoky violet-grey — luxe hotel vibe
    secondaryLight: "#A79EB8",
    secondaryDark: "#474157",

    accent: "#D8A95D", // Brushed champagne gold

    background: "#F4F5F7", // Cool mineral grey (not warm like Wellness)
    foreground: "#1D1F21",

    textPrimary: "#1D1F21",
    textSecondary: "#505458",
  },
  dark: {
    primary: "#4A7E88",
    primaryLight: "#8EBBC3",
    primaryDark: "#31575E",

    secondary: "#6A607F",
    secondaryLight: "#A79EB8",
    secondaryDark: "#474157",

    accent: "#D8A95D",

    background: "#181A1B", // Polished onyx charcoal
    foreground: "#E7E9EA",

    textPrimary: "#E7E9EA",
    textSecondary: "#B5B7BA",
  },
};

export const aquaStone: ThemePalette = {
  name: "aqua-stone",
  label: "Aqua Stone",
  light: {
    primary: "#6FA8B8", // Mineral aqua
    primaryLight: "#A8D1DD",
    primaryDark: "#4B7A86",

    secondary: "#8F7A5A", // Limestone warm neutral (NOT green)
    secondaryLight: "#C3B59C",
    secondaryDark: "#5E513C",

    accent: "#E3C27A", // Soft gold

    background: "#F6F7F8", // Clean light stone
    foreground: "#26292A",

    textPrimary: "#26292A",
    textSecondary: "#585B5C",
  },
  dark: {
    primary: "#6FA8B8",
    primaryLight: "#A8D1DD",
    primaryDark: "#4B7A86",

    secondary: "#8F7A5A",
    secondaryLight: "#C3B59C",
    secondaryDark: "#5E513C",

    accent: "#E3C27A",

    background: "#1A1C1D", // Soft charcoal
    foreground: "#E9EBEC",

    textPrimary: "#E9EBEC",
    textSecondary: "#B7B9BA",
  },
};

/** COPPER CLAY — Inspired by luxury ceramics & terracotta spas */
export const copperClay: ThemePalette = {
  name: "copper-clay",
  label: "Copper Clay",
  light: {
    primary: "#B86A4C", // Copper
    primaryLight: "#DBA68F",
    primaryDark: "#804530",

    secondary: "#6A8570", // Green-grey counterbalance
    secondaryLight: "#9CB9A3",
    secondaryDark: "#435646",

    accent: "#E7C475", // Warm gold

    background: "#FAF6F3",
    foreground: "#2A2725",

    textPrimary: "#2A2725",
    textSecondary: "#5A5450",
  },
  dark: {
    primary: "#B86A4C",
    primaryLight: "#DBA68F",
    primaryDark: "#804530",

    secondary: "#6A8570",
    secondaryLight: "#9CB9A3",
    secondaryDark: "#435646",

    accent: "#E7C475",

    background: "#1C1A18",
    foreground: "#EEE9E5",

    textPrimary: "#EEE9E5",
    textSecondary: "#BEB9B5",
  },
};

/** ARCTIC MIST — Clean, icy clinic + wellness aesthetic */
export const arcticMist: ThemePalette = {
  name: "arctic-mist",
  label: "Arctic Mist",
  light: {
    primary: "#7EAEC9", // Ice blue
    primaryLight: "#B6D4E3",
    primaryDark: "#547A91",

    secondary: "#4C6370", // Cold slate
    secondaryLight: "#7C8E98",
    secondaryDark: "#2F3D46",

    accent: "#E3B25A", // Warm contrast

    background: "#F5F8FA",
    foreground: "#1F2427",

    textPrimary: "#1F2427",
    textSecondary: "#4D565C",
  },
  dark: {
    primary: "#7EAEC9",
    primaryLight: "#B6D4E3",
    primaryDark: "#547A91",

    secondary: "#4C6370",
    secondaryLight: "#7C8E98",
    secondaryDark: "#2F3D46",

    accent: "#E3B25A",

    background: "#171B1D",
    foreground: "#E3E8EB",

    textPrimary: "#E3E8EB",
    textSecondary: "#A8B0B5",
  },
};

/** ROYAL SAGE — Premium spa branding direction */
export const royalSage: ThemePalette = {
  name: "royal-sage",
  label: "Royal Sage",
  light: {
    primary: "#7D8D6D", // Sage green
    primaryLight: "#AFBCA6",
    primaryDark: "#556048",

    secondary: "#85669B", // Regal purple
    secondaryLight: "#B99BC7",
    secondaryDark: "#5A436A",

    accent: "#D9B56A",

    background: "#F6F4F2",
    foreground: "#242321",

    textPrimary: "#242321",
    textSecondary: "#56534F",
  },
  dark: {
    primary: "#7D8D6D",
    primaryLight: "#AFBCA6",
    primaryDark: "#556048",

    secondary: "#85669B",
    secondaryLight: "#B99BC7",
    secondaryDark: "#5A436A",

    accent: "#D9B56A",

    background: "#1B1A18",
    foreground: "#EAE7E2",

    textPrimary: "#EAE7E2",
    textSecondary: "#B9B5AF",
  },
};

/** Registry */
export const PALETTES: ThemePalette[] = [
  wellness,
  urbanOnyx,
  aquaStone,
  copperClay,
  arcticMist,
  royalSage,
];
