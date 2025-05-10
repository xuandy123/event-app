import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // Fetch user from Prisma
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        // Verify password
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
