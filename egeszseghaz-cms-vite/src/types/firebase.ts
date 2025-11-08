/* eslint-disable prettier/prettier */

import {
  HeroSchema,
  AboutSchema,
  ServicesSchema,
  ReviewsSchema,
  NavbarSchema,
  FooterSchema,
} from "@/templates/home/home_schema";

export interface PageDoc {
  id: string;
  meta?: { title?: string; description?: string };
  hero: HeroSchema;
  about: AboutSchema;
  services: ServicesSchema;
  reviews: ReviewsSchema;
  navbar: NavbarSchema;
  footer: FooterSchema;
}
