/* eslint-disable prettier/prettier */

import { NewServiceSchema } from "./new_service_schema";

export const defaultServiceTemplate: NewServiceSchema = {
  isDisplayed: true,
  heroImage: {
    url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600",
    alt: "Gyógytorna",
  },
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1600",
      alt: "Mozgásterápia",
    },
    {
      url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600",
      alt: "Rehabilitáció",
    },
    {
      url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1600",
      alt: "Fizioterápia",
    },
  ],
  title: {
    text: "Gyógytorna – Mozgásterápia",
  },
  subtitle: {
    text: "Személyre szabott regeneráció és mobilizáció",
    color: "text-secondary",
  },
  description: {
    text: "A gyógytorna célja, hogy helyreállítsa a mozgásszervek egyensúlyát, csökkentse a fájdalmat és javítsa a mindennapi életminőséget.",
    color: "text-secondary",
    leftBorderColor: "primary-light",
  },
  longDescription: {
    text:
      "A programunk személyre szabott megközelítést alkalmaz, amely figyelembe veszi az egyéni igényeket és mozgásmintákat.\n\n" +
      "Tapasztalt gyógytornászaink modern mobilizációs technikákat, lágyrészkezelést és erősítő feladatokat alkalmaznak a tartós eredmény érdekében. " +
      "A kezelések célja a fájdalom csökkentése, a mobilitás növelése és a helytelen terhelés kijavítása.\n\n" +
      "Ajánlott hát-, derék- és vállfájdalom esetén, műtét utáni rehabilitáció részeként, valamint monoton ülőmunka okozta problémáknál.",
    color: "text-secondary",
    bg: "surface",
    rounded: "xl",
    border: "accent",
  },
  contactInfo: {
    phone: {
      isDisplayed: true,
      number: "+36 30 123 4567",
      color: "text-secondary",
      iconColor: "primary-dark",
      bgColor: "primary-light",
      rounded: "md",
    },
    email: {
      isDisplayed: true,
      address: "info@erzsebetiegeszseghaz.hu",
      color: "text-secondary",
      iconColor: "primary-dark",
      bgColor: "primary-light",
      rounded: "md",
    },
  },
  primaryButton: {
    isDisplayed: true,
    label: "Több információ",
    color: "secondary",
    variant: "solid",
    href: "#services",
  },
  secondaryButton: {
    isDisplayed: true,
    label: "Nem érdekel",
    color: "primary",
    variant: "ghost",
  },
};
