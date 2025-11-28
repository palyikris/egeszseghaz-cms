/* eslint-disable prettier/prettier */
import {
  Home,
  Image as Img,
  Palette,
  Newspaper,
  MessageCircleWarning,
  Cog,
} from "lucide-react";

export const items = [
  { title: "Main Page", url: "/", icon: Home },
  { title: "General", url: "/settings", icon: Cog },
  { title: "Images", url: "/settings#images", icon: Img },
  { title: "Prebuilt palettes", url: "/settings#palettes", icon: Palette },
  {
    title: "Announcement",
    url: "/settings#announcement",
    icon: MessageCircleWarning,
  },
  { title: "New Service", url: "/settings#new_service", icon: Newspaper },
  { title: "All Services", url: "/services", icon: Newspaper },
];