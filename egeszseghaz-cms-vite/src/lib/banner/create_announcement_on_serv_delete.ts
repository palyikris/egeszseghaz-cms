/* eslint-disable prettier/prettier */


import { AnnouncementSchema } from "@/templates/announcement/announcement_schema";
import { editAnnouncement, fetchAnnouncement } from "./announcement";

export async function createAnnouncementOnServDelete(serviceName: string) { 
  const announcement: AnnouncementSchema | null = await fetchAnnouncement();

  if (!announcement) {
    throw new Error("Announcement schema not found");
  }

  const updatedAnnouncement: AnnouncementSchema = {
    ...announcement,
    isDisplayed: true,
    title: `Megszűnik a(z) ${serviceName.charAt(0).toUpperCase() + serviceName.slice(1).toUpperCase()} szolgáltatás!`,
    date: new Date().toISOString(),
    description: `A(z) ${serviceName.charAt(0).toUpperCase() + serviceName.slice(1).toUpperCase()} szolgáltatás már nem elérhető az Egészségházban. Kérünk mindenkit, hogy tekintse meg kínálatunkat további szolgáltatásokért. A kellemetlenségért elnézést kérünk!`,
    cta: {
      label: "Szolgáltatások megtekintése",
      url: "/#services",
      isVisible: true,
    },
    theme: "warning",
  };

  editAnnouncement(updatedAnnouncement);

  return;
}