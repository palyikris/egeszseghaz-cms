import { Review } from "@/types/reviews";

/* eslint-disable prettier/prettier */
export interface NavbarSchema {
  iconUrl: string;
  title: { text: string; color: string };
  links: { label: string; href: string; color: string }[];
  scrolledBgColor: string;
}

export interface HeroSchema {
  mainImageUrl: string;
  bgColor: { from: string; via: string; to: string; direction: string };
  heading: { text: string; color: string };
  subheading: { text: string; color: string };
  primaryButton: {
    isDisplayed: boolean;
    label: string;
    href: string;
    color: string;
    variant: string;
  };
  secondaryButton: {
    isDisplayed: boolean;
    label: string;
    href: string;
    color: string;
    variant: string;
  };
  contacts: {
    phone: { number: string; icon: string };
    social: { link: string; text: string };
    name: { text: string; icon: string };
  };
}

export type AboutFeature = {
  text: string;
  iconColor: string;
  iconBgColor: string;
  icon: string;
};
export interface AboutSchema {
  aboutImg: {
    url: string;
    rounded: string;
    shadow: { color: string; blur: string };
    accents: {
      position: {
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
      };
      color: string;
      size: string;
      blur: string;
    }[];
  };
  heading: { textFirst: string; textSecond: string; color: string };
  description: { text: string; color: string };
  features: AboutFeature[];
  primaryButton: {
    isDisplayed: boolean;
    label: string;
    href: string;
    color: string;
    variant: string;
  };
  secondaryButton: {
    isDisplayed: boolean;
    label: string;
    href: string;
    color: string;
    variant: string;
  };
}

export interface ServicesSchema {
  heading: { text: string; color: string };
  bgColor: { from: string; via: string; to: string; direction: string };
  card: any;
}

export interface ReviewsSchema {
  heading: { text: string; color: string };
  spinningText: {
    text: string;
    color: string;
    radius: number;
    duration: number;
  };
  card: any;
  reviews: Review[];
}

export interface FooterSchema {
  bgColor: {
    direction: string;
    from: string;
    to: string;
    via: string;
  };
  textColor: string;
  glow: { from: string; to: string; opacity: string; direction: string };
  sections: {
    logo: {
      title: {
        text: string;
        color: string;
      };
      tagline: {
        text: string;
        color: string;
      };
    };
    links: {
      title: {
        text: string;
        color: string;
      };
      linkList: { label: string; href: string }[];
    };
    contact: {
      title: {
        text: string;
        color: string;
      };
      phone: {
        number: string;
        color: string;
        iconColor: string;
      };
      email: {
        address: string;
        color: string;
        iconColor: string;
      };
      address: {
        text: string;
        color: string;
        iconColor: string;
        mapLink: string;
        mapText: string;
        mapTextColor: string;
      };
    };
    openingHours: {
      title: {
        text: string;
        color: string;
      };
      hours: { day: string; time: string; color: string }[];
    };
  };
  upArrow: { color: string; bgColor: string; iconColor: string };
}

export interface HomeSchema {
  meta: { title: string; description: string; iconUrl: string };
  navbar: NavbarSchema;
  hero: HeroSchema;
  about: AboutSchema;
  services: ServicesSchema;
  reviews: ReviewsSchema;
  footer: FooterSchema;
}
