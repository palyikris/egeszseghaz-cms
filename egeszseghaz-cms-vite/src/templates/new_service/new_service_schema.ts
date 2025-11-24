/* eslint-disable prettier/prettier */

export interface TextField {
  text: string;
  color?: string; // tailwind color token or utility class
}

export interface TextBlock {
  text: string;
  color: string;
  // optional tailwind utility classes for background, padding, border, shadow, rounded, etc
  bg?: string;
  padding?: string;
  border?: string;
  rounded?: string;
  shadow?: string;
  shadowColor?: string;
  leftBorderColor?: string;
}

export interface ImageField {
  url: string;
  alt: string;
}

export interface ContactField {
  phone: {
    number: string;
    color: string;
    iconColor: string;
    bgColor: string;
    rounded: string;
    isDisplayed: boolean;
  };
  email: {
    address: string;
    color: string;
    iconColor: string;
    bgColor?: string;
    rounded?: string;
    isDisplayed: boolean;
  };
}

export interface NewServiceSchema {
  isDisplayed: boolean;

  // images
  heroImage: ImageField;
  gallery: ImageField[];

  // headings & text
  title: TextField;
  subtitle?: TextField;
  description?: TextBlock; // short
  longDescription?: TextBlock; // longer card-like text

  // contact
  contactInfo: ContactField;

  // button style tokens
  primaryButton?: {
    isDisplayed?: boolean;
    label: string;
    href?: string;
    color?: string;
    variant?: string;
  };
  secondaryButton?: {
    isDisplayed?: boolean;
    label: string;
    href?: string;
    color?: string;
    variant?: string;
  };
}
