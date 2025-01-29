import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { AuthService } from "@/domain/services/AuthService";
import { client } from "@/infrastructure/graphql/apollo-client";

const authService = new AuthService();

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
          const response = await authService.login({
            email: credentials?.email || "",
            password: credentials?.password || "",
          });

          if (response?.user) {
            return {
              ...response.user,
              accessToken: response.token,
            };
          }
          return null;
        } catch (error) {
          throw new Error("Authentication failed");
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
