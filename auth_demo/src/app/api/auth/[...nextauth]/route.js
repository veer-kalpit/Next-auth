import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
// import axios from "axios";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace with your user validation logic
        const { email, password } = credentials || {};

        // Example validation (replace with DB logic)
        if (email === "test@example.com" && password === "password") {
          return { id: "1", name: "Test User", email: "test@example.com" };
        }
        return null; // Return null if user is invalid
      },
    }),
  ],
  pages: {
    signIn: "/Login", // Redirect to the login page
    signOut: "/Login",
    error: "/Login", // Redirect to login on error
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in `.env.local`
});

export { handler as GET, handler as POST };
