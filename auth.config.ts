// auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;

      // Protect create + edit (management)
      const isProtected =
        path.startsWith("/meetings/new") ||
        /^\/meetings\/[^/]+\/edit$/.test(path);

      if (isProtected) {
        if (isLoggedIn) return true;
        return false; // Auth.js redirects to /login
      }

      if (isLoggedIn && path === "/login") {
        return Response.redirect(new URL("/meetings", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
