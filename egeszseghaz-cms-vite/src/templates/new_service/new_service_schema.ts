/* eslint-disable prettier/prettier */

export interface ServiceSchema {
  heroImage: string;
  gallery: string[];
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  priceList: Array<{
    label: string;
    price: string;
  }>;
  contactInfo: {
    phone: string;
    email: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}
