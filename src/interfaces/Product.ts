import { TireType } from "@/enums/TireType";
import { WheelType } from "@/enums/WheelType";

// ProductSize interface
export interface ProductSize {
  id: number;
  productId: number;
  name: string;
  overallDiameter: number;
  overallWidth: number;
  measurementRim: string;
  standardRim: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

// Product interface
export interface Product {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  patternAndType: string;
  wheel: WheelType;
  type: TireType;
  productSizes: ProductSize[];
  createdAt: Date;
  updatedAt: Date;
}
