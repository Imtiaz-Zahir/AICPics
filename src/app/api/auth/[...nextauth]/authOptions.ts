import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("Missing Google client ID or secret");
}

export default {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  callbacks: {
    signIn: async (test) => {
      console.log(test);
      return true;
    },
  },
} satisfies NextAuthOptions;
