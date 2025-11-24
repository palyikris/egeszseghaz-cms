/* eslint-disable prettier/prettier */
export interface AnnouncementSchema {
  isDisplayed: boolean;
  title: string;
  date: string;
  description: string;
  cta: {
    label: string;
    url: string;
    isVisible: boolean;
  };
  theme: "info" | "warning" | "highlight";
}
