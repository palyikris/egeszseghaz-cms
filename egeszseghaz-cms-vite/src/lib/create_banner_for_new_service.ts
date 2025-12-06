/* eslint-disable prettier/prettier */
import { NewServiceSchema } from "@/templates/new_service/new_service_schema";
import { Service } from "@/types/services";

import { editNewService, fetchNewService } from "./new_service";


export async function createBannerForNewService(service: Service) {
  const newServiceSchema: NewServiceSchema | null = await fetchNewService()

  if (!newServiceSchema) {
    throw new Error("NewService schema not found");
  }

  const updatedSchema: NewServiceSchema = {
    ...newServiceSchema,
    isDisplayed: true,
    heroImage: {
      url: service.img,
      alt: service.name,
    },
    gallery: [],
    title: {
      ...newServiceSchema.title,
      text: `Új szolgáltatás: ${service.name.charAt(0).toUpperCase() + service.name.slice(1).toUpperCase()}`,
    },
    subtitle: {
      ...newServiceSchema.subtitle,
      text: "Próbáld ki most!"
    },
    description: {
      ...newServiceSchema.description,
      text: "",
      color: newServiceSchema.description?.color || "",
    },

    longDescription: {
      text: service.desc || "",
      color: newServiceSchema.longDescription?.color || "",
    },
    contactInfo: {
      phone: {
        ...newServiceSchema.contactInfo.phone,
        number: service.phone || "",
      },
      email: {
        ...newServiceSchema.contactInfo.email,
        isDisplayed: false,
      },
    },
    primaryButton: {
      ...newServiceSchema.primaryButton,
      label: "További információ",
      href: `/services/${service.id}`,
    }
  };

  console.log("Updated NewService schema:", updatedSchema);

  await editNewService(updatedSchema);

  return;
  
}