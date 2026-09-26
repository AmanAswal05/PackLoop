export type ProductCategory = "Food" | "Retail" | "Paper" | "Reusable" | "Compostable" | "Recyclable" | "Low MOQ" | "Under ₹10" | "Under ₹15";

export interface Product {
  id: string;
  name: string;
  price: number;
  moq: number;
  material: string;
  category: ProductCategory[];
  supplierId: string;
  image: string;
  size: string;
  suitableFor: string;
  sustainability: string;
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  rating: number;
  isVerified: boolean;
  moqRange: string;
  leadTime: string;
  categories: string[];
}

export interface GroupBuy {
  id: string;
  productId: string;
  targetQuantity: number;
  currentQuantity: number;
  currentPrice: number;
  targetPrice: number;
  participants: number;
}

export const mockSuppliers: Supplier[] = [
  {
    id: "s1",
    name: "GreenPack Solutions",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    isVerified: true,
    moqRange: "250 - 5000 units",
    leadTime: "3-5 days",
    categories: ["Paper", "Kraft", "Compostable"]
  },
  {
    id: "s2",
    name: "EcoBox Packaging",
    location: "Pune, Maharashtra",
    rating: 4.6,
    isVerified: false,
    moqRange: "500 - 10000 units",
    leadTime: "5-7 days",
    categories: ["Corrugated", "Paper"]
  },
  {
    id: "s3",
    name: "EarthWrap India",
    location: "Bengaluru, Karnataka",
    rating: 4.9,
    isVerified: true,
    moqRange: "100 - 2000 units",
    leadTime: "7-10 days",
    categories: ["Reusable", "Fabric"]
  },
  {
    id: "s4",
    name: "BioPlast Alternatives",
    location: "Ahmedabad, Gujarat",
    rating: 4.5,
    isVerified: true,
    moqRange: "1000 - 20000 units",
    leadTime: "3-5 days",
    categories: ["Food", "Compostable"]
  },
  {
    id: "s5",
    name: "PackLite Co.",
    location: "Delhi, NCR",
    rating: 4.4,
    isVerified: false,
    moqRange: "200 - 5000 units",
    leadTime: "4-6 days",
    categories: ["Retail", "Recyclable"]
  }
];

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Kraft Cookie Box",
    price: 6.50,
    moq: 500,
    material: "Kraft paperboard",
    category: ["Food", "Paper", "Recyclable", "Under ₹10"],
    supplierId: "s1",
    image: "/images/products/kraft-cookie-box.jpg",
    size: "15 x 10 x 5 cm",
    suitableFor: "Cookies / Bakery",
    sustainability: "Recyclable material — supplier information provided"
  },
  {
    id: "p2",
    name: "Paper Stand-Up Pouch",
    price: 8.20,
    moq: 300,
    material: "Paper-based laminate",
    category: ["Food", "Paper", "Under ₹10"],
    supplierId: "s1",
    image: "/images/products/paper-stand-up-pouch.jpg",
    size: "200g capacity",
    suitableFor: "Dry food",
    sustainability: "Compostable lining — Document uploaded"
  },
  {
    id: "p3",
    name: "Reusable Fabric Pouch",
    price: 18.00,
    moq: 100,
    material: "Cotton fabric",
    category: ["Retail", "Reusable", "Low MOQ"],
    supplierId: "s3",
    image: "/images/products/reusable-fabric-pouch.jpg",
    size: "Medium (15x20 cm)",
    suitableFor: "Retail / Gifts",
    sustainability: "100% natural cotton — reusable"
  },
  {
    id: "p4",
    name: "Corrugated Mailer Box",
    price: 12.00,
    moq: 250,
    material: "Corrugated board",
    category: ["Retail", "Paper", "Recyclable", "Under ₹15"],
    supplierId: "s2",
    image: "/images/products/corrugated-mailer-box.jpg",
    size: "20 x 15 x 8 cm",
    suitableFor: "E-commerce",
    sustainability: "Made from 80% recycled content"
  },
  {
    id: "p5",
    name: "Compostable Food Container",
    price: 9.50,
    moq: 1000,
    material: "Bagasse (Sugarcane)",
    category: ["Food", "Compostable", "Under ₹10"],
    supplierId: "s4",
    image: "/images/products/compostable-food-container.jpg",
    size: "500ml",
    suitableFor: "Takeaway / Hot Food",
    sustainability: "Commercially compostable — Document uploaded"
  },
  {
    id: "p6",
    name: "Kraft Paper Bag (Small)",
    price: 3.50,
    moq: 1000,
    material: "Kraft Paper",
    category: ["Retail", "Food", "Paper", "Under ₹10"],
    supplierId: "s5",
    image: "/images/products/kraft-paper-bag.jpg",
    size: "10 x 5 x 15 cm",
    suitableFor: "Takeaway / Retail",
    sustainability: "Recyclable — supplier information provided"
  },
  {
    id: "p7",
    name: "Bamboo Cutlery Set",
    price: 14.00,
    moq: 200,
    material: "Bamboo",
    category: ["Food", "Compostable", "Under ₹15", "Low MOQ"],
    supplierId: "s4",
    image: "/images/products/bamboo-cutlery-set.jpg",
    size: "Standard",
    suitableFor: "Dine-in / Premium Takeaway",
    sustainability: "Renewable material"
  },
  {
    id: "p8",
    name: "Glass Jars with Cork",
    price: 25.00,
    moq: 100,
    material: "Glass & Cork",
    category: ["Food", "Retail", "Reusable", "Low MOQ"],
    supplierId: "s3",
    image: "/images/products/glass-jars-cork.jpg",
    size: "150ml",
    suitableFor: "Spices / Dry ingredients",
    sustainability: "Endlessly recyclable glass"
  },
  {
    id: "p9",
    name: "Recycled Poly Mailer",
    price: 4.50,
    moq: 500,
    material: "Recycled LDPE",
    category: ["Retail", "Recyclable", "Under ₹10"],
    supplierId: "s2",
    image: "/images/products/recycled-poly-mailer.jpg",
    size: "25 x 35 cm",
    suitableFor: "Apparel E-commerce",
    sustainability: "Contains 50% post-consumer recycled plastic"
  },
  {
    id: "p10",
    name: "Molded Pulp Trays",
    price: 5.50,
    moq: 800,
    material: "Recycled paper pulp",
    category: ["Food", "Paper", "Recyclable", "Under ₹10"],
    supplierId: "s1",
    image: "/images/products/molded-pulp-trays.jpg", // Using a placeholder that fits
    size: "2-cup holder",
    suitableFor: "Beverage takeaway",
    sustainability: "Recycled material"
  }
];

export const mockGroupBuys: GroupBuy[] = [
  {
    id: "g1",
    productId: "p1", // Kraft Cookie Box
    targetQuantity: 5000,
    currentQuantity: 3700,
    currentPrice: 7.20,
    targetPrice: 5.90,
    participants: 18
  },
  {
    id: "g2",
    productId: "p2", // Paper Stand-Up Pouch
    targetQuantity: 10000,
    currentQuantity: 7200,
    currentPrice: 9.10,
    targetPrice: 7.40,
    participants: 27
  },
  {
    id: "g3",
    productId: "p4", // Corrugated Mailer Box
    targetQuantity: 5000,
    currentQuantity: 4200,
    currentPrice: 8.50,
    targetPrice: 7.20,
    participants: 14
  },
  {
    id: "g4",
    productId: "p5", // Compostable Food Container
    targetQuantity: 20000,
    currentQuantity: 15500,
    currentPrice: 11.00,
    targetPrice: 8.50,
    participants: 42
  },
  {
    id: "g5",
    productId: "p9", // Recycled Poly Mailer
    targetQuantity: 8000,
    currentQuantity: 2000,
    currentPrice: 5.50,
    targetPrice: 4.00,
    participants: 5
  }
];
