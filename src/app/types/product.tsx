export type Product = {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  TireSize: string;
  PatternAndType: string;
  OverAllDiameter: number;
  OverAllWidth: number;
  MeasurementRim: string;
  StandardRim: string;
  Wheel: string; // wheelType
  Type: string; // tireType
  Quantity: number;
  Price: number;
  createdAt: string;
  updatedAt: string;
};