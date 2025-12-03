/* eslint-disable prettier/prettier */
import { HomeSchema } from "./home_schema";

export const DefaultHomeTemplate: HomeSchema = {
  meta: {
    title: "Egészségház - A Pesterzsébeti Egészségház - XX. kerület Főoldal",
    description:
      "A Pesterzsébeti Egészségház megújul! Szeretne kikapcsolódni, edzeni, relaxálni, testi épségét erősíteni? Mindezt egy helyen? Megteheti a megújult Pesterzsébeti Egészségházban!",
    iconUrl: "/favicon.ico",
  },
  navbar: {
    iconUrl: "/logo.png",
    title: { text: "Egészségház", color: "primary-dark" },
    links: [
      { label: "Főoldal", href: "#hero", color: "primary-dark" },
      { label: "Szolgáltatások", href: "#services", color: "primary-dark" },
      { label: "Rólunk", href: "#about", color: "primary-dark" },
      { label: "Kapcsolat", href: "#contact", color: "primary-dark" },
    ],
    scrolledBgColor: "primary/90",
  },
  hero: {
    mainImageUrl: "/main_image.png",
    bgColor: {
      from: "primary-light",
      via: "primary-light/90",
      to: "secondary-light",
      direction: "to-r",
    },
    heading: { text: "Egészségben, harmóniában.", color: "primary-dark" },
    subheading: {
      text: "A Pesterzsébeti Egészségház a testi és lelki egészség otthona — szolgáltatásaink között minden korosztály megtalálja a számára megfelelőt.",
      color: "text-secondary",
    },
    primaryButton: {
      isDisplayed: true,
      label: "Szolgáltatásaink",
      href: "#services",
      color: "primary",
      variant: "solid",
    },
    secondaryButton: {
      isDisplayed: true,
      label: "Rólunk",
      href: "#about",
      color: "secondary",
      variant: "ghost",
    },
    contacts: {
      phone: { number: "06 30 573 2212" },
      social: {
        link: "https://www.facebook.com/egeszseghazfitness/?_rdr",
        text: "Facebook oldalunk",
      },
      name: { text: "Kerekesné Tollár Anikó" },
    },
  },
  about: {
    aboutImg: {
      url: "/logo.png",
      rounded: "2xl",
      shadow: { color: "primary/80", blur: "lg" },
      accents: [
        {
          position: { top: "0", left: "0" },
          color: "accent",
          size: "1/2",
          blur: "3xl",
        },
        {
          position: { bottom: "0", right: "0" },
          color: "accent",
          size: "1/2",
          blur: "3xl",
        },
      ],
    },
    heading: {
      textFirst: "A Mi Küldetésünk...",
      textSecond: "A Te Egészséged!",
      color: "primary-dark",
    },
    description: {
      text: "Az Egészségház célja, hogy egy helyen kínáljon prevenciós, mozgás- és egészségmegőrző programokat. Modern felszereltség, képzett szakemberek és barátságos környezet vár mindenkit.",
      color: "text-secondary",
    },
    features: [
      {
        text: "Masszázs és terápiák",
        iconColor: "primary-dark",
        iconBgColor: "primary-light/20",
      },
      {
        text: "Képzett szakemberek",
        iconColor: "primary-dark",
        iconBgColor: "primary-light/20",
      },
      {
        text: "Modern felszereltség",
        iconColor: "primary-dark",
        iconBgColor: "primary-light/20",
      },
    ],
    primaryButton: {
      isDisplayed: true,
      label: "Tovább",
      href: "#services",
      color: "secondary",
      variant: "solid",
    },
    secondaryButton: {
      isDisplayed: true,
      label: "Értékelések",
      href: "#reviews",
      color: "primary",
      variant: "ghost",
    },
  },
  services: {
    heading: { text: "Szolgáltatásaink", color: "primary-dark" },
    bgColor: {
      from: "primary-light",
      via: "primary-light/90",
      to: "accent",
      direction: "to-br",
    },
    card: {
      bgColor: "surface",
      borderColor: "primary-dark",
      hoverBorderColor: "accent",
      shadow: "md",
      shadowColor: "shadow",
      rounded: "2xl",
      hoverOverlay: {
        text: "Fedezd fel",
        textColor: "background-light",
        bgColor: "primary-dark/30",
        backdropBlur: "2px",
        textSize: "lg",
      },
      heading: { color: "primary-dark", hoverColor: "primary" },
      button: {
        variant: "ghost",
        color: "primary",
        hoverBgColor: "primary-light/40",
        label: "Megnézem",
      },
    },
  },
  reviews: {
    heading: { text: "Így írtok ti.", color: "primary-dark" },
    spinningText: {
      text: "Pácienseink mondták - Nem mi találjuk ki - Gyere próbáld ki te is",
      color: "primary-dark",
      radius: 15,
      duration: 40,
    },
    card: {
      bgColor: "surface",
      borderColor: "border",
      textColor: "text-secondary",
      starColor: "#E6B655",
      size: "6",
      authorColor: "primary-dark",
    },
    reviews: [],
  },
  footer: {
    bgColor: {
      from: "primary-dark",
      via: "primary-light/90",
      to: "primary-dark",
      direction: "to-br",
    },
    textColor: "inherit",
    glow: {
      from: "primary",
      to: "transparent",
      opacity: "30",
      direction: "to-t",
    },
    sections: {
      logo: {
        title: {
          text: "Pesterzsébeti Egészségház",
          color: "accent",
        },
        tagline: {
          text: "Az egészség, mozgás és harmónia otthona. Várjuk szeretettel Pesterzsébet szívében!",
          color: "inherit",
        },
      },
      links: {
        title: {
          text: "Navigáció",
          color: "accent",
        },
        linkList: [
          { label: "Kezdőlap", href: "/" },
          { label: "Rólunk", href: "/#about" },
          { label: "Szolgáltatások", href: "/#services" },
          { label: "Házirend", href: "/#rules" },
          { label: "Adatkezelési tájékoztató", href: "/#privacy" },
        ],
      },
      contact: {
        title: {
          text: "Elérhetőségek",
          color: "accent",
        },
        phone: {
          number: "+36 30 573 2212",
          color: "inherit",
          iconColor: "inherit",
        },
        email: {
          address: "egfit.20@gmail.com",
          color: "inherit",
          iconColor: "inherit",
        },
        address: {
          text: "Átlós utca 17–19, Budapest",
          color: "inherit",
          iconColor: "inherit",
          mapLink:
            "https://www.google.com/maps/place/Egészségház/@47.4235536,19.1048283,17z",
          mapText: "Nézd meg térképen →",
          mapTextColor: "accent",
        },
      },
      openingHours: {
        title: {
          text: "Nyitvatartás",
          color: "accent",
        },
        hours: [
          {
            day: "Hétfő - Péntek",
            time: "08:00 - 20:00",
            color: "inherit",
          },
          {
            day: "Szombat-Vasárnap",
            time: "Zárva",
            color: "inherit",
          },
        ],
      },
    },
    upArrow: { color: "primary", bgColor: "primary-light", iconColor: "#fff" },
  },
};
