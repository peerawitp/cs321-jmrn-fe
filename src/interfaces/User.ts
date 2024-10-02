import { UserRole } from "@/enums/UserRole";

export default interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  role?: UserRole;
}
