/* eslint-disable prettier/prettier */
import {
  Home,
  Image as Img,
  Palette,
  Newspaper,
  MessageCircleWarning,
} from "lucide-react";

export const items = [
  { title: "General", url: "/settings", icon: Home },
  { title: "Images", url: "/settings#images", icon: Img },
  { title: "Prebuilt palettes", url: "/settings#palettes", icon: Palette },
  {
    title: "Announcement",
    url: "/settings#announcement",
    icon: MessageCircleWarning,
  },
  { title: "New Service", url: "/settings#new_service", icon: Newspaper },
];