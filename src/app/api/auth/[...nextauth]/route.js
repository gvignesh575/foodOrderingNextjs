import { User } from "@/app/models/User";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongodbConnect.js";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;
          mongoose.connect(process.env.MONGO_URL);
          const users = await User.find({ email });
          if (users.length > 0) {
            const user = users[0]; // Assuming you're only interested in the first user with this email
            const passwordOk =
              user && bcrypt.compareSync(password, user.password);
            if (passwordOk) {
              return user;
            }
          }

          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
