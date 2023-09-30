import User from "@models/user";
import { hash } from "bcrypt";

const { connectToDB } = require("@utils/database");

export const POST = async (req) => {
    const { email, username, password } = await req.json();

    try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ username: username });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
            const newUser =  new User({
                email: email,
                username: username,
                password: await hash(password, 12),
                image: 'https://i.cbc.ca/1.5359228.1577206958!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/smudge-the-viral-cat.jpg'
            });

            await newUser.save();

            return new Response('User created', { status: 200 })
        }

        return new Response('Username already taken', { status: 409 })
    } catch (error) {
        return new Response(error, { status: 500 })
    }
}