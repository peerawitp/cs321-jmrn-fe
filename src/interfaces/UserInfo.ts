import { UserRole } from "@/enums/UserRole";
import Address from "./Address";

export default interface UserInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  role?: UserRole;
  phone: string;

  addresses: Address[];
}
