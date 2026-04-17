import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      credentialToken: string;
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    id: string;
    userToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    credentialToken?: string;
  }
}