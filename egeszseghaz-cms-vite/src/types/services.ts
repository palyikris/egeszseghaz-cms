/* eslint-disable prettier/prettier */
export interface Service {
  content?: {
    htmlBlocks: Array<{ id: string; html: string }>;
    priceTable: Array<{
      id: string;
      label: string;
      price: string;
      description?: string;
    }>;
    images: Array<{
      url: string;
      name: string;
    }>;
  };
  id: string;
  name: string;
  coach?: string;
  desc: string;
  img: string;
  phone: string;
}