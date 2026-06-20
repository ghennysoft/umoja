import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

const role = "ADMIN" | "AGENT" | "MEMBER";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: role;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: role;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: role;
  }
}
