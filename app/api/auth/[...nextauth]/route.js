import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import User from '@models/user';
import { connectToDB } from '@utils/database';
import bcrypt from 'bcrypt';


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: 'anon-username-login',
      name: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Enter username',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter password',
        },
      },

      // async authorize(credentials) {
      authorize: async (credentials) => {
        console.log("🚀 ~ file: route.js:56 ~ credentials: ~ authorize:=====================================");
        
        if (!credentials) return null;

        const user = await User.findOne({ username: credentials.username });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          // Incorrect password
          return null;
        }

        return user;
      },
    }),
  ],
  
  callbacks: {
    session: async ({ session, user }) => {
      console.log("🚀 ~ file: route.js:56 ~ callbacks: ~ session:=====================================");
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({
        $or: [
          { email: session.user.email },
          { username: session.user.username },
        ]
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    signIn: async ({ account, profile, user, credentials }) => {
      console.log("🚀 ~ file: route.js:34 ~ callbacks: ~ signin:======================================");
      return Promise.resolve(true);
      
    },
  },
  session: {
    jwt: true,
  },
  jwt: {
    secret: "secret",
    encryption: true
  },
  debug: true,
  pages: {
    error: '/anon-signin',
  },
})

export { handler as GET, handler as POST }