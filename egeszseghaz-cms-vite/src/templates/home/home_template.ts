/* eslint-disable prettier/prettier */
export const HomeTemplate = {
  meta: {
    title: "Egészségház - A Pesterzsébeti Egészségház - XX. kerület Főoldal",
    description:
      "A Pesterzsébeti Egészségház megújul! Szeretne kikapcsolódni, edzeni, relaxálni, testi épségét erősíteni? Mindezt egy helyen? Megteheti a megújult Pesterzsébeti Egészségházban!",
    iconUrl: "/favicon.ico",
  },
  page: {
    navbar: {
      iconUrl: "/logo.png",
      title: {
        text: "Egészségház",
        color: "primary-dark",
      },
      links: [
        { label: "Főoldal", href: "#hero", color: "primary-dark" },
        { label: "Szolgáltatások", href: "#services", color: "primary-dark" },
        { label: "Rólunk", href: "#about", color: "primary-dark" },
        { label: "Kapcsolat", href: "#contact", color: "primary-dark" },
      ],
    },
    hero: {
      mainImageUrl: "/main_image.png",
      bgColor: {
        from: "primary-light",
        via: "primary-light/90",
        to: "secondary-light",
        direction: "to-r",
      },
      heading: {
        text: "Egészségben, harmóniában.",
        color: "primary-dark",
      },
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
        phone: {
          number: "06 30 573 2212",
          color: "background-light",
          iconColor: "background-light",
          icon: "phone",
        },
        social: {
          link: "https://www.facebook.com/egeszseghazfitness/?_rdr",
          color: "background-light",
          iconColor: "background-light",
          icon: "facebook",
        },
        name: {
          text: "Kerekesné Tollár Anikó",
          color: "background-light",
          iconColor: "background-light",
          icon: "person",
        },
      },
    },
    about: {
      aboutImgUrl: {
        url: "/logo.png",
        shadow: {
          color: "primary/80",
          blur: "lg",
        },
        accents: [
          {
            position: {
              top: "0",
              left: "0",
            },
            color: "secondary-light",
            size: "1/2",
            blur: "3xl",
          },
          {
            position: {
              bottom: "0",
              right: "0",
            },
            color: "secondary-light",
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
      description:
        "Az Egészségház célja, hogy egy helyen kínáljon prevenciós, mozgás- és egészségmegőrző programokat. Modern felszereltség, képzett szakemberek és barátságos környezet vár mindenkit.",
      features: [
        {
          text: "Masszázs és terápiák",
          icon: "massage",
          color: "primary-dark",
          iconColor: "primary-dark",
          iconBgColor: "primary-light/20",
          bgRounded: "full",
        },
        {
          text: "Képzett szakemberek",
          icon: "expert",
          color: "primary-dark",
          iconColor: "primary-dark",
          iconBgColor: "primary-light/20",
          bgRounded: "full",
        },
        {
          text: "Modern felszereltség",
          icon: "equipment",
          color: "primary-dark",
          iconColor: "primary-dark",
          iconBgColor: "primary-light/20",
          bgRounded: "full",
        },
      ],
      primaryButton: {
        isDisplayed: true,
        label: "Tovább",
        href: "#services",
        color: "inherit",
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
      heading: {
        text: "Szolgáltatásaink",
        color: "primary-dark",
      },
      bgColor: {
        from: "primary-light",
        via: "primary-light/90",
        to: "secondary-light",
        direction: "to-tl",
      },
      card: {
        glow: {
          from: "accent",
          via: "secondary",
          to: "accent",
        },
        hoverOverlay: {
          text: "Fedezd fel",
          textColor: "background-light",
          bgColor: "primary-dark/30",
          backdropBlur: "2px",
        },
        heading: {
          color: "primary-dark",
          hoverColor: "primary",
        },
        description: {
          color: "text-secondary",
        },
        button: {
          variant: "ghost",
          color: "primary",
          hoverBgColor: "primary-light/40",
        },
      },
    },
    reviews: {
      heading: {
        text: "Mit mondtok rólunk?",
        color: "primary-dark",
      },
      spinningText: {
        text: "Pácienseink mondták - Nem mi találjuk ki - Gyere próbáld ki te is",
        color: "primary-dark",
        radius: 15,
        duration: 40,
      },
      card: {
        bgColor: "surface",
        borderColor: "border",
        shadow: "md",
        shadowColor: "shadow",
        textColor: "text-secondary",
        starColor: "#E6B655",
        size: "8",
        authorColor: "primary-dark",
      },
    },
    footer: {
      bgColor: "primary-dark",
      textColor: "background-light",
      glow: {
        from: "primary",
        to: "transparent",
        opacity: "30",
        direction: "to-t",
      },
      sections: {
        logo: {
          heading: {
            text: "Pesterzsébeti Egészségház",
            color: "accent",
          },
          tagline: {
            text: "Az egészség, mozgás és harmónia otthona. Várjuk szeretettel Pesterzsébet szívében!",
            color: "background-light/80",
          },
        },
        quickLinks: {
          heading: {
            text: "Navigáció",
            color: "accent",
          },
          links: [
            {
              label: "Kezdőlap",
              href: "/",
              color: "inherit",
              hoverColor: "accent",
            },
            {
              label: "Rólunk",
              href: "/#about",
              color: "inherit",
              hoverColor: "accent",
            },
            {
              label: "Szolgáltatások",
              href: "/#services",
              color: "inherit",
              hoverColor: "accent",
            },
            {
              label: "Házirend",
              href: "/#rules",
              color: "inherit",
              hoverColor: "accent",
            },
            {
              label: "Adatkezelési tájékoztató",
              href: "/#privacy",
              color: "inherit",
              hoverColor: "accent",
            },
          ],
        },
        contact: {
          heading: {
            text: "Elérhetőségek",
            color: "accent",
          },
          phone: {
            number: "06 30 573 2212",
            color: "background-light/90",
            iconColor: "background-light/90",
            icon: "phone",
          },
          email: {
            address: "egfit.20@gmail.com",
            color: "background-light/90",
            iconColor: "background-light/90",
            icon: "email",
          },
          address: {
            text: "Átlós utca 17–19, Budapest",
            color: "background-light/90",
            iconColor: "background-light/90",
            icon: "location",
          },
          map: {
            link: {
              href: "https://www.google.com/maps/place/Egészségház/@47.4235536,19.1048283,17z",
              label: "Nézd meg a térképen",
              color: "accent",
            },
          },
        },
        openingHours: {
          heading: {
            text: "Nyitvatartás",
            color: "accent",
          },
          weekdays: {
            text: "Hétfő – Péntek: 8:00 – 20:00",
            color: "background-light/90",
          },
          weekend: {
            text: "Szombat – Vasárnap: Zárva",
            color: "background-light/90",
          },
        }
      },
      upArrow: {
        color: "primary",
        bgColor: "primary-light",
        iconColor: "#fff",
      }
    },
  },
};

export interface ButtonTemplate {
  isDisplayed: boolean;
  label: string;
  href: string;
  color: string;
}