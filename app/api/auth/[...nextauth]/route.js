import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session({ session }) {
        const currUser = await User.findOne({ email: session.user.email });

        session.user.id = currUser._id.toString();

        return session;
    },
    async signIn({ profile }) {
        try {
            await connectToDB();

            //check if user already exists using email
            const userExists = await User.findOne({ email: profile.email });

            //create new user, if user does not exist
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.username.replace(" ", "_").toLowerCase(),
                    image: profile.image
                });
            }

        } catch (error) {
            console.log(error);
            return false;
        }
    }
});

export { handler as GET, handler as POST }