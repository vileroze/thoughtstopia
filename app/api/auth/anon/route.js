import User from "@models/user";
import { hash } from "bcrypt";

const { connectToDB } = require("@utils/database");

export const POST  = async (req) => {
    const {email, username, password} = await req.json();

    try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ username: username });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
        //   await User.create({
        //     email: email,
        //     username: username.toLowerCase(),
        //     password: await hash(password, 12),
        //   });
        }else{
            return new Response('Username already taken', {status: 201})
        }

        return new Response('User created', {status: 201})
    } catch (error) {
        return new Response('Failed to create new thought', {status: 500})
    } 
}