import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUsersByID } from "@/services/userService";

const authOptions: NextAuthOptions = {
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
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
};

export default authOptions;
