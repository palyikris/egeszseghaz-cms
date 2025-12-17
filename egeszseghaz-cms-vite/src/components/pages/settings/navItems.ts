/* eslint-disable prettier/prettier */
import { url } from "inspector";
import {
  Home,
  Image as Img,
  Palette,
  Newspaper,
  MessageCircleWarning,
  Cog,
  CircleQuestionMark,
} from "lucide-react";

export const items = [
  { title: "Főoldal", url: "/", icon: Home },
  { title: "Általános", url: "/settings", icon: Cog },
  { title: "Képek", url: "/settings#images", icon: Img },
  {
    title: "Előre definiált paletták",
    url: "/settings#palettes",
    icon: Palette,
  },
  {
    title: "Közlemény",
    url: "/settings#announcement",
    icon: MessageCircleWarning,
  },
  { title: "Új szolgáltatás", url: "/settings#new_service", icon: Newspaper },
  { title: "Összes szolgáltatás", url: "/settings#services", icon: Newspaper },
  {
    title: "Dokumentáció",
    url: "https://egeszseghaz-cms-docs.vercel.app",
    icon: CircleQuestionMark,
  },
];