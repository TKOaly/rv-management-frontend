import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminPage = nextUrl.pathname.startsWith("/admin");
      if (isAdminPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl));
      }
      return true;
    },
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string().min(1), password: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const authResponse = await fetch(
            `${process.env.RV_BACKEND_URL}/api/v1/admin/authenticate`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(parsedCredentials.data),
            },
          );
          if (!authResponse.ok) {
            return null;
          }

          const res = await authResponse.json();
          return res.accessToken;
        }

        console.log("Invalid login");
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
