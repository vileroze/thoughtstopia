import Thought from "@models/thought";

const { connectToDB } = require("@utils/database");

export const GET = async (req, { params }) => {

    try {
        await connectToDB();

        const thoughts = await Thought.find({creator: params.id}).populate('creator');

        return new Response(JSON.stringify(thoughts), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch posts', { status: 500 })
    }
}