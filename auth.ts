// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) {
          console.log("PARSE FAIL", parsed.error.flatten());
          return null;
        }

        const { email, password } = parsed.data;
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;

        console.log("ENV present?", {
          hasEmail: !!adminEmail,
          hasHash: !!adminHash,
        });
        console.log(
          "Email match?",
          email.toLowerCase() === adminEmail?.toLowerCase(),
        );

        if (!adminEmail || !adminHash) return null;
        if (email.toLowerCase() !== adminEmail.toLowerCase()) return null;

        const match = await bcrypt.compare(password, adminHash);
        console.log("Password match?", match);

        if (!match) return null;

        return {
          id: "1",
          name: "Bishopric",
          email: adminEmail,
        };
      },
    }),
  ],
});
