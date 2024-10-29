import { TireType } from "@/enums/TireType";
import { WheelType } from "@/enums/WheelType";

export interface UpdateProduct {
  id: number;
  name?: string;
  description?: string;
  image?: File;
  patternAndType?: string;
  wheel?: WheelType;
  type?: TireType;
}
