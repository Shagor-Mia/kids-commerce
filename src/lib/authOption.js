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
        const user = await loginUser(credentials);

        if (!user) {
          return null;
        }

        return user; //  return user
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // session: {
  //   strategy: "jwt",
  // },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //       token.role = user.role;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.user.id = token.id;
  //     session.user.role = token.role;
  //     return session;
  //   },
  // },
  // pages: {
  //   signIn: "/login",
  // },

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
      console.log({ user, account, profile, email, credentials });

      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    // async session({ session, token, user }) {
    //   return session
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token
    // }
  },
};
