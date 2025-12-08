/* eslint-disable prettier/prettier */
export interface ServiceDetailStyles {
  hero?: {
    titleColor?: string;
    subtitleColor?: string;
    bgColor?: string;
  };
  htmlBlocks?: {
    headingColor?: string;
    textColor?: string;
  };
  carousel?: {
    arrowColor?: string;
    dotColor?: string;
  };
  priceTable?: {
    headingColor?: string;
    priceColor?: string;
    rowBg?: string;
  };
}

export interface ServiceDetailSchema {
  id: string;
  styles: ServiceDetailStyles;
}
