import { TireType } from "@/enums/TireType";
import { WheelType } from "@/enums/WheelType";

export interface AddProduct {
  name: string;
  description: string | null;
  image: File | null;
  patternAndType: string;
  wheel: WheelType;
  type: TireType;
}
