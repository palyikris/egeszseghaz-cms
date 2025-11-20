/* eslint-disable prettier/prettier */
import { AnnouncementSchema } from "./announcement_schema";

export const defaultAnnouncementTemplate: AnnouncementSchema = {
  bannerImage: "",
  title: "Új esemény",
  date: "",
  description: "",
  cta: {
    label: "",
    url: "",
    isVisible: false,
  },
  theme: "info",
};
