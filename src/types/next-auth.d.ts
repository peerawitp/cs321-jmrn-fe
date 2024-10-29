import { UserRole } from "@/enum/UserRole";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: User;
  }

  interface User {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken?: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
