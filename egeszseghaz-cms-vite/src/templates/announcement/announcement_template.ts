/* eslint-disable prettier/prettier */
import { AnnouncementSchema } from "./announcement_schema";

export const defaultAnnouncementTemplate: AnnouncementSchema = {
  isDisplayed: true,
  bannerImage: "/main_image.png",
  title: "Ingyenes Egészségnap – Szűrések és Tanácsadás",
  date: "2025-03-14",
  description:
    "Szeretettel várjuk pácienseinket és érdeklődő vendégeinket az Egészségnapon! \n\nA nap folyamán ingyenes alap-szűréseket, életmód tanácsadást, valamint könnyű tornát tartunk gyógytornász vezetésével. \n\nA program mindenki számára nyitott, regisztráció nem szükséges.",
  cta: {
    label: "Részletek",
    url: "/events/egeszsegnap-2025",
    isVisible: true,
  },
  theme: "warning",
};
