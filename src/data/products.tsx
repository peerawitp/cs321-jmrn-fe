export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tireType: string;
  imageUrl: string;
  quantity: number;
  tireSize: string;
  patternAndType: string;
  overallDiameter: string;
  overallWidth: string;
  measurementRim: string;
  standardRim: string;
  wheelType: string;
  customOption?: CustomOption[];
}

interface CustomOption {
  label: string;
  options: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Michelin Pilot Road 4",
    description: "Sport-touring tire offering superior wet grip and long-lasting performance.",
    price: 180,
    tireType: "On-Road Sport",
    imageUrl: "/images/product1.jpg",
    quantity: 5,
    tireSize: "120/70 ZR17",
    patternAndType: "Radial, Semi-Slick",
    overallDiameter: "24.1 inches",
    overallWidth: "4.7 inches",
    measurementRim: "3.50 inches",
    standardRim: "3.75 inches",
    wheelType: "Tubeless",
    customOption: [
      { label: "Size", options: ["Small", "Medium", "Large"] }
    ],
  },
  {
    id: 2,
    name: "Pirelli Diablo Rosso III",
    description: "High-performance tire designed for sports motorcycles and track racing.",
    price: 220,
    tireType: "Racing",
    imageUrl: "/images/product2.jpg",
    quantity: 3,
    tireSize: "180/55 ZR17",
    patternAndType: "Radial, Sport Performance",
    overallDiameter: "25.0 inches",
    overallWidth: "7.1 inches",
    measurementRim: "5.50 inches",
    standardRim: "5.75 inches",
    wheelType: "Tubeless",
    customOption: [
      { label: "Size", options: ["Small", "Medium", "Large"] }
    ],
  },
  {
    id: 3,
    name: "Bridgestone Battlax Adventure A41",
    description: "Dual-sport tire with excellent stability and performance for both on-road and off-road.",
    price: 195,
    tireType: "On/Off-Road",
    imageUrl: "/images/product1.jpg",
    quantity: 8,
    tireSize: "150/70 R17",
    patternAndType: "Radial, Dual-Sport",
    overallDiameter: "25.6 inches",
    overallWidth: "5.9 inches",
    measurementRim: "4.50 inches",
    standardRim: "4.75 inches",
    wheelType: "Tubeless",
    customOption: [
      { label: "Size", options: ["Small", "Medium", "Large"] }
    ],
  },
  {
    id: 4,
    name: "Dunlop Trailmax Mission",
    description: "Off-road tire designed for adventure touring with long tread life.",
    price: 160,
    tireType: "Off-Road",
    imageUrl: "/images/product2.jpg",
    quantity: 6,
    tireSize: "110/80-19",
    patternAndType: "Bias-Ply, Off-Road",
    overallDiameter: "26.4 inches",
    overallWidth: "4.4 inches",
    measurementRim: "2.50 inches",
    standardRim: "2.75 inches",
    wheelType: "Tube Type",
    customOption: [
      { label: "Size", options: ["Small", "Medium", "Large"] }
    ],
  },
];
