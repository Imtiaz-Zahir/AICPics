import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {
  createUser,
  getUsersByEmail,
  storeLastVisit,
} from "@/services/userService";

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
        if (!user.name || !user.email || !user.image) {
          console.log("Invalid user data", user);
          throw new Error("Invalid user data");
        }

        const doseUserExists = await getUsersByEmail(user.email);

        if (!doseUserExists) {
          await createUser(user.name, user.email, user.image);
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    session({ session }) {
      if (session.user?.email) storeLastVisit(session.user.email);
      return session;
    },
  },
};

export default authOptions;
