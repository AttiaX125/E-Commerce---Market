import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    
    Google
    
    ,
    Credentials(
      {
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },

      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
          }
        );

        const data = await res.json();

        // 🔴 MUST validate response
        if (!res.ok || data.message !== "success") {
          return null;
        }

        // ⚠️ IMPORTANT: ensure these fields actually exist
        return {
          id: data.user.id || data.user._id,
          name: data.user.name,
          email: data.user.email,
          userToken: data.token
        };
      }
    }),

    



  ],

  // ✅ REQUIRED
  session: {
    strategy: "jwt"
  },

  callbacks: {
    async jwt({ token, user }) {
      // Runs ONLY on login (user exists)
      if (user) {
        token.userId = user.id;
        token.credentialToken = user.userToken;
      }


      return token;
    },

    async session({ session, token }) {
      // Attach data to session
      if (session.user) {
        session.user.id = token.userId;
        session.user.credentialToken = token.credentialToken;
      }

      return session;
    }
  },

  pages: {
    signIn: "/login"
  }
});
