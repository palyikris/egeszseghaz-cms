/* eslint-disable prettier/prettier */

export interface TextField {
  text: string;
  color?: string; // tailwind color token or utility class
}

export interface TextBlock {
  text: string;
  color?: string;
  // optional tailwind utility classes for background, padding, border, shadow, rounded, etc
  bg?: string;
  padding?: string;
  border?: string;
  rounded?: string;
  shadow?: string;
}

export interface ImageField {
  url: string;
  // optional tailwind utility classes for wrapper and image
  wrapper?: string;
  img?: string;
  alt?: string;
}

export interface PriceItem {
  label: TextField | string;
  price: TextField | string;
}

export interface ContactField {
  phone?: { number: string; color?: string; iconColor?: string };
  email?: { address: string; color?: string; iconColor?: string };
}

export interface ServiceSchema {
  isDisplayed: boolean;

  // images
  heroImage: ImageField;
  gallery: ImageField[];

  // headings & text
  title: TextField;
  subtitle?: TextField;
  description?: TextBlock; // short
  longDescription?: TextBlock; // longer card-like text

  // pricing
  priceList: PriceItem[];

  // contact
  contactInfo: ContactField;

  // per-element styling (optional utility classes applied to wrappers)
  sectionClass?: string;
  containerClass?: string;
  leftColumnClass?: string;
  rightColumnClass?: string;

  // button style tokens
  primaryButton?: { isDisplayed?: boolean; label: string; href?: string; color?: string; variant?: string; class?: string };
  secondaryButton?: { isDisplayed?: boolean; label: string; href?: string; color?: string; variant?: string; class?: string };

  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface ServiceStyleSchema {
  // Section & container
  section?: string;
  container?: string;

  // Columns
  leftColumn?: string;
  rightColumn?: string;

  // Text
  title?: string;
  subtitle?: string;
  description?: string;
  longDescription?: string;

  // Contact & pricing
  contactContainer?: string;
  contactItem?: string;
  contactIcon?: string;
  priceList?: string;
  priceItem?: string;
  priceLabel?: string;
  pricePrice?: string;

  // Buttons
  buttonsContainer?: string;
  primaryButton?: string;
  secondaryButton?: string;

  // Images / gallery
  heroImageWrapper?: string;
  heroImage?: string;
  galleryContainer?: string;
  galleryImage?: string;

  // Misc
  divider?: string;
}

// Note: styles are returned/used by the templates and components
