import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUsersByID } from "@/services/userService";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const doseUserExists = await getUsersByID(user.id);

        if (!doseUserExists) {
          await createUser(
            user.id,
            user.name ?? "USER",
            user?.email ?? "not found",
            user?.image ?? "/user.png"
          );
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
})

export { handler as GET, handler as POST }