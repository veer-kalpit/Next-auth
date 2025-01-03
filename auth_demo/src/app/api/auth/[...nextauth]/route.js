import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
// import axios from "axios";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: {
    //       label: "Username",
    //       type: "text",
    //       placeholder: "Enter your username",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "Enter your password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     try {
    //       // Send login request to Strapi
    //       const { data } = await axios.post(
    //         `${process.env.STRAPI_URL}/auth/local`,
    //         {
    //           identifier: credentials.username,
    //           password: credentials.password,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`, // Optional if using Strapi token
    //           },
    //         }
    //       );

    //       if (data?.user) {
    //         // Return user details with JWT
    //         return {
    //           id: data.user.id,
    //           name: data.user.username,
    //           email: data.user.email,
    //           jwt: data.jwt,
    //         };
    //       }

    //       throw new Error("Invalid username or password");
    //     } catch (error) {
    //       console.error("Login error:", error.response?.data || error.message);
    //       throw new Error("Login failed. Please check your credentials.");
    //     }
    //   },
    // }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //       token.jwt = user.jwt; // Store JWT for later use in API calls
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (token) {
  //       session.user.id = token.id;
  //       session.user.jwt = token.jwt; // Make JWT available in the session
  //     }
  //     return session;
  //   },
  // },
  // secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "/auth/signin", // Custom sign-in page (optional)
  // },
});

export { handler as GET, handler as POST };
