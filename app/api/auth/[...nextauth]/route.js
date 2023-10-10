import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import User from '@models/user';
import { connectToDB } from '@utils/database';
import { hash } from 'bcrypt';
import bcrypt from 'bcrypt';


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
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
      async authorize(credentials) {
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
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      // const sessionUser = await User.findOne({ email: session.user.email });
      const sessionUser = await User.findOne({
        $or: [
          { email: session.user.email },
          { username: session.user.username },
        ]
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        if (account.provider === 'google') {
          // check if user already exists
          const userExists = await User.findOne({ email: profile.email });

          // if not, create a new document and save user in MongoDB
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              password: await hash('111', 12),
              image: profile.picture,
            });
          }
        } else if (account.provider === 'credentials') {

          // const pass = await hash(credentials.password,12);
          // check if user already exists
          // const userExists = await User.findOne({ username: credentials.username });
          // const userExists = await User.findOne({
          //   $and: [
          //     { username: credentials.username },
          //     { password: await hash(credentials.password,12) },
          //   ]
          // });
        }

        return true;

      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
  pages: {
    error: '/anon-signin',
  },
})

export { handler as GET, handler as POST }