// products.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  tireType: string;
  imageUrl: string;
  wheelType: string;
  sizes: ProductSize[]; // มีหลายขนาดในหนึ่งสินค้า
}

export interface ProductSize {
  tireSize: string;
  price: number;
  quantity: number;
  overallDiameter: string;
  overallWidth: string;
  measurementRim: string;
  standardRim: string;
}

// ค้นหาสินค้าตาม productId
export const findProductById = (productId: number): Product | undefined => {
  return products.find((product) => product.id === productId);
};

// ตัวอย่างสินค้า
export const products: Product[] = [
  {
    id: 1,
    name: "Michelin Pilot Road 4",
    description: "Sport-touring tire offering superior wet grip and long-lasting performance.",
    tireType: "On-Road Sport",
    imageUrl: "/images/product1.jpg",
    wheelType: "Tubeless",
    sizes: [
      {
        tireSize: "120/70 ZR17",
        price: 180,
        quantity: 5,
        overallDiameter: "24.1 inches",
        overallWidth: "4.7 inches",
        measurementRim: "3.50 inches",
        standardRim: "3.75 inches"
      },
      {
        tireSize: "180/55 ZR17",
        price: 220,
        quantity: 3,
        overallDiameter: "25.0 inches",
        overallWidth: "7.1 inches",
        measurementRim: "5.50 inches",
        standardRim: "5.75 inches"
      }
    ],
  },
  {
    id: 2,
    name: "Pirelli Diablo Rosso III",
    description: "High-performance tire designed for sports motorcycles and track racing.",
    tireType: "Racing",
    imageUrl: "/images/product2.jpg",
    wheelType: "Tubeless",
    sizes: [
      {
        tireSize: "180/55 ZR17",
        price: 220,
        quantity: 3,
        overallDiameter: "25.0 inches",
        overallWidth: "7.1 inches",
        measurementRim: "5.50 inches",
        standardRim: "5.75 inches"
      }
    ],
  }
];
