/* eslint-disable prettier/prettier */

import { ServiceSchema } from "./new_service_schema";

export const defaultServiceTemplate: ServiceSchema = {
  heroImage: "",
  gallery: [],
  title: "Új szolgáltatás",
  subtitle: "",
  description: "",
  longDescription: "",
  priceList: [
    {
      label: "",
      price: "",
    },
  ],
  contactInfo: {
    phone: "",
    email: "",
  },
  seo: {
    title: "",
    description: "",
    keywords: "",
  },
};
