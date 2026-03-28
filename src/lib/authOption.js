import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const user = await loginUser(credentials);
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "google") {
        const dbUser = await dbConnect(collections.USERS).findOne({
          email: user.email,
        });

        // যদি user না থাকে → create
        if (!dbUser) {
          await dbConnect(collections.USERS).insertOne({
            provider: "google",
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
          });
        }
      }
      // console.log({ user, account, profile, email, credentials });

      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async session({ session, token, user }) {
      if (token) {
        session.role = token?.role;
        session.email = token?.email;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("account data in token", account);
      if (user) {
        if (account.provider == "google") {
          const dbUser = await dbConnect(collections.USERS).findOne({
            email: user.email,
          });

          token.role = dbUser?.role;
          token.email = dbUser?.email;
        } else {
          token.role = user?.role;
          token.email = user?.email;
        }
      }
      return token;
    },
  },
};
