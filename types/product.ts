export interface Product {
  id: number;
  slug: string;
  name: string;

  price: number;
  originalPrice?: number;

  description: string;

  category: string;

  images: string[];

  sizes: string[];

  stock: number;

  featured?: boolean;

  newArrival?: boolean;

  sale?: boolean;

  isNew?: boolean;

  isSale?: boolean;
}