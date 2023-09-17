import Thought from "@models/thought";

const { connectToDB } = require("@utils/database");

export const POST  = async (req) => {
    const {userId, thought, tag} = await req.json();

    try {
        await connectToDB();

        const newThought = new Thought({
            creator: userId,
            thought,
            tag
        })

        await newThought.save();

        return new Response(JSON.stringify(newThought), {status: 201})
    } catch (error) {
        return new Response('Failed to create new thought', {status: 500})
    } 
}