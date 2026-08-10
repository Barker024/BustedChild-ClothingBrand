import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    slug: "all-dawgs-hoodie",

    name: "All Dawgs Go To Heaven Hoodie",

    price: 650.00,

    description:
      "Heavyweight premium hoodie built for everyday wear. Oversized fit with premium embroidery and soft brushed fleece interior.",

    category: "hoodies",

    images: [
      "/images/products/All Dawgs HoodieFront.png",
       "/images/products/All Dawgs HoodieBack.png",
    ],

    sizes: ["S", "M", "L", "XL", "XXL"],

    stock: 15,

    featured: true,

    isNew: true,
  },

  {
    id: 2,
    slug: "busted-earth-hoodie",

    name: "Busted 3D Puffed Hoodie",

    price: 650.00,

    description:
      "Premium 240gsm oversized hoodie designed for comfort and style.",

    category: "hoodies",

    images: [
      "/images/products/BC Earth.png",
       "/images/products/BC EarthBack.jpeg",
    ],

    sizes: ["S", "M", "L", "XL"],

    stock: 20,
  },

   {
    id: 3,
    slug: "busted-ubc-tee",

    name: "Busted University Tee",

    price: 450.00,

    description:
      "Premium 240gsm oversized t-shirt designed for comfort and style.",

    category: "t-shirts",

    images: [
      "/images/products/UBC TEE_BlackFront.png",
       "/images/products/UBC TEE_BlackBack.png",
    ],

    sizes: ["S", "M", "L", "XL"],

    stock: 20,
  },

   {
    id: 4,
    slug: "busted-ghostTown-pants",

    name: "Busted GhostTown Sweatpants",

    price: 450.00,

    description:
      "Premium 240gsm oversized t-shirt designed for comfort and style.",

    category: "tracksuits",

    images: [
      "/images/products/GhostTown SweatPants.jpg",
       "/images/products/GhostTown SweatPants.jpg",
    ],

    sizes: ["S", "M", "L", "XL"],

    stock: 20,
  },

   {
    id: 5,
    slug: "busted-certified-lovers-beanie",

    name: "Busted CertifiedLovers Beanie",

    price: 250.00,

    description:
      "Premium 240gsm oversized t-shirt designed for comfort and style.",

    category: "accessories",

    images: [
      "/images/products/BC Beanie2 red.jpeg",
       "/images/products/BC Beanie2 red.jpeg",
    ],

    sizes: ["One size"],

    stock: 20,
  },

   {
    id: 6,
    slug: "busted-happy-pill-hoodie",

    name: "Busted HappyPill Hoodie",

    price: 650.00,

    description:
      "Premium 240gsm oversized t-shirt designed for comfort and style.",

    category: "hoodies",

    images: [
      "/images/products/HappyPill HoodieFront.png",
       "/images/products/HappyPill HoodieBack.png",
    ],

    sizes: ["S", "M", "L", "XL"],

    stock: 20,
  },

   {
    id: 7,
    slug: "busted-tennis-club-hoodie",

    name: "Busted TennisClub Hoodie",

    price: 450,

    description:
      "Premium 240gsm oversized t-shirt designed for comfort and style.",

    category: "hoodies",

    images: [
      "/images/products/TennisClub Front.png",
       "/images/products/TennisClub Back.png",
    ],

    sizes: ["S", "M", "L", "XL"],

    stock: 20,
  },
];