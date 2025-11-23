/* eslint-disable prettier/prettier */

import { ServiceSchema } from "./new_service_schema";

export const defaultServiceTemplate: ServiceSchema = {
  isDisplayed: true,
  heroImage:
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600",
  gallery: [
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1600",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600",
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1600",
  ],
  title: "Gyógytorna – Mozgásterápia",
  subtitle: "Személyre szabott regeneráció és mobilizáció",
  description:
    "A gyógytorna célja, hogy helyreállítsa a mozgásszervek egyensúlyát, csökkentse a fájdalmat és javítsa a mindennapi életminőséget.",
  longDescription:
    "A programunk személyre szabott megközelítést alkalmaz, amely figyelembe veszi az egyéni igényeket és mozgásmintákat.\n\n" +
    "Tapasztalt gyógytornászaink modern mobilizációs technikákat, lágyrészkezelést és erősítő feladatokat alkalmaznak a tartós eredmény érdekében. " +
    "A kezelések célja a fájdalom csökkentése, a mobilitás növelése és a helytelen terhelés kijavítása.\n\n" +
    "Ajánlott hát-, derék- és vállfájdalom esetén, műtét utáni rehabilitáció részeként, valamint monoton ülőmunka okozta problémáknál.",
  priceList: [
    {
      label: "Egyéni gyógytorna (50 perc)",
      price: "8 500 Ft",
    },
    {
      label: "Mobilizációs kezelés (30 perc)",
      price: "5 500 Ft",
    },
    {
      label: "Komplex állapotfelmérés (60 perc)",
      price: "12 000 Ft",
    },
  ],
  contactInfo: {
    phone: "+36 30 123 4567",
    email: "info@erzsebetiegeszseghaz.hu",
  },
  seo: {
    title: "Gyógytorna – Mozgásterápia | Erzsébet Egészségház",
    description:
      "Személyre szabott gyógytorna és mozgásterápia hátfájás, derékfájás, ülőmunka okozta panaszok és rehabilitáció esetén.",
    keywords:
      "gyógytorna, mozgásterápia, rehabilitáció, hátfájás kezelése, derékfájdalom, mobilizáció",
  },
};
