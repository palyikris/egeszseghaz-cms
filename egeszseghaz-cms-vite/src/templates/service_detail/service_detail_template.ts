/* eslint-disable prettier/prettier */
import { ServiceDetailSchema } from "./service_detail_schema";

export const DefaultServiceDetailTemplate: ServiceDetailSchema = {
  id: "serviceDetail",
  styles: {
    hero: {
      titleColor: "primary-dark",
      subtitleColor: "text-secondary",
      bgColor: "primary-light/10",
    },
    htmlBlocks: {
      headingColor: "primary-dark",
      textColor: "text-secondary",
    },
    carousel: {
      arrowColor: "primary-dark",
      dotColor: "accent",
    },
    priceTable: {
      headingColor: "primary-dark",
      priceColor: "accent",
      rowBg: "surface",
    },
  },
};
