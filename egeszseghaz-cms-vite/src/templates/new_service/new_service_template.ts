/* eslint-disable prettier/prettier */

import { ServiceSchema } from "./new_service_schema";

export const defaultServiceTemplate: ServiceSchema = {
  isDisplayed: true,
  heroImage: {
    url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600",
    wrapper: "rounded-2xl overflow-hidden shadow-lg",
    img: "w-full h-64 md:h-72 object-cover transition-transform duration-[1300ms] hover:scale-[1.05]",
    alt: "Gyógytorna",
  },
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1600",
      img: "w-full h-28 md:h-32 object-cover transition-transform duration-500 hover:scale-105",
    },
    {
      url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600",
      img: "w-full h-28 md:h-32 object-cover transition-transform duration-500 hover:scale-105",
    },
    {
      url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1600",
      img: "w-full h-28 md:h-32 object-cover transition-transform duration-500 hover:scale-105",
    },
  ],
  title: {
    text: "Gyógytorna – Mozgásterápia",
    color:
      "text-3xl md:text-4xl font-semibold leading-tight pb-1 bg-gradient-to-r from-primary-dark to-secondary-dark bg-clip-text text-transparent",
  },
  subtitle: {
    text: "Személyre szabott regeneráció és mobilizáció",
    color: "text-lg text-text-secondary relative inline-block italic font-bold",
  },
  description: {
    text: "A gyógytorna célja, hogy helyreállítsa a mozgásszervek egyensúlyát, csökkentse a fájdalmat és javítsa a mindennapi életminőséget.",
    color: "text-base text-text-secondary leading-relaxed whitespace-pre-line",
    padding: "pl-3",
    border: "border-l-2 border-primary-light",
  },
  longDescription: {
    text:
      "A programunk személyre szabott megközelítést alkalmaz, amely figyelembe veszi az egyéni igényeket és mozgásmintákat.\n\n" +
      "Tapasztalt gyógytornászaink modern mobilizációs technikákat, lágyrészkezelést és erősítő feladatokat alkalmaznak a tartós eredmény érdekében. " +
      "A kezelések célja a fájdalom csökkentése, a mobilitás növelése és a helytelen terhelés kijavítása.\n\n" +
      "Ajánlott hát-, derék- és vállfájdalom esetén, műtét utáni rehabilitáció részeként, valamint monoton ülőmunka okozta problémáknál.",
    color: "text-text-secondary",
    bg: "bg-surface",
    padding: "p-4",
    rounded: "rounded-xl",
    border: "border border-accent/50",
    shadow: "shadow-sm",
  },
  priceList: [
    {
      label: {
        text: "Egyéni gyógytorna (50 perc)",
        color: "text-text-secondary",
      },
      price: { text: "8 500 Ft", color: "font-semibold text-primary-dark" },
    },
    {
      label: {
        text: "Mobilizációs kezelés (30 perc)",
        color: "text-text-secondary",
      },
      price: { text: "5 500 Ft", color: "font-semibold text-primary-dark" },
    },
    {
      label: {
        text: "Komplex állapotfelmérés (60 perc)",
        color: "text-text-secondary",
      },
      price: { text: "12 000 Ft", color: "font-semibold text-primary-dark" },
    },
  ],
  contactInfo: {
    phone: {
      number: "+36 30 123 4567",
      color: "text-text-secondary",
      iconColor: "rounded-md p-2 text-primary-dark bg-primary-light/20",
    },
    email: {
      address: "info@erzsebetiegeszseghaz.hu",
      color: "text-text-secondary",
      iconColor: "rounded-md p-2 text-primary-dark bg-primary-light/20",
    },
  },
  sectionClass:
    "py-14 px-6 sm:px-12 md:px-20 bg-background-light transition-all duration-300",
  containerClass:
    "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start",
  leftColumnClass: "space-y-5",
  rightColumnClass: "relative space-y-4 md:space-y-5",
  primaryButton: {
    isDisplayed: true,
    label: "Több információ",
    color: "secondary",
    variant: "solid",
    class: "font-semibold",
  },
  secondaryButton: {
    isDisplayed: true,
    label: "Nem érdekel",
    color: "primary",
    variant: "ghost",
    class: "font-semibold",
  },
  seo: {
    title: "Gyógytorna – Mozgásterápia | Erzsébet Egészségház",
    description:
      "Személyre szabott gyógytorna és mozgásterápia hátfájás, derékfájás, ülőmunka okozta panaszok és rehabilitáció esetén.",
    keywords:
      "gyógytorna, mozgásterápia, rehabilitáció, hátfájás kezelése, derékfájdalom, mobilizáció",
  },
};
