// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Only when logging in
      if (account && profile) {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/social-login`, {
            email: profile.email,
            name: profile.name,
            image: profile.picture,
            provider: account.provider,
          });

          const { jwtToken, userId } = res.data;

          token.appToken = jwtToken;
          token.userId = userId;
        } catch (err) {
          console.error("Social login error:", err.message);
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.appToken = token.appToken;
      session.userId = token.userId;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
