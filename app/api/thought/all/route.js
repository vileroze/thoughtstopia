import Thought from "@models/thought";

const { connectToDB } = require("@utils/database");

export const GET = async (req) => {

    try {
        await connectToDB();

        const posts = await Thought.find({}).populate('creator');

        return new Response(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch posts', { status: 500 })
    }
}