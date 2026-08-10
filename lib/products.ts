export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "busted-earth-hoodie",
    name: "Busted Earth Hoodie",
    price: 899,
    image: "/images/products/busted-earth.jpg",
    category: "Hoodies",
    description: "Premium heavyweight hoodie built for everyday wear."
  },
  {
    id: 2,
    slug: "built-different-tee",
    name: "Built Different Tee",
    price: 499,
    image: "/images/products/built-different.jpg",
    category: "T-Shirts",
    description: "Oversized premium cotton streetwear tee."
  },
  {
    id: 3,
    slug: "busted-child-cap",
    name: "Busted Child Cap",
    price: 349,
    image: "/images/products/cap.jpg",
    category: "Accessories",
    description: "Classic embroidered cap."
  }
];