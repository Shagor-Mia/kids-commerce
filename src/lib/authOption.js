import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        // email: { label: "Email", type: "email" },
        // password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const user = await loginUser(credentials);

        if (!user) {
          return null;
        }

        return user; //  return user
      },
    }),
  ],
};
