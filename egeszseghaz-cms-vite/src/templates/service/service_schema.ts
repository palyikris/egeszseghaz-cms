/* eslint-disable prettier/prettier */
export interface ServiceSchema {
  id: string;
  name: string;
  img: string;
  desc: string;
  phone: string;

  content: {
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
}
