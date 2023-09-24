import Thought from "@models/thought";

const { connectToDB } = require("@utils/database");

//GET
export const GET = async (req, {params}) => {

    try {
        await connectToDB();

        const post = await Thought.findById(params.id).populate('creator');

        if(!post) return new Response("Post not found", { status: 404 })

        return new Response(JSON.stringify(post), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch post', { status: 500 })
    }
}


//PATCH
export const PATCH = async (req, {params}) => {

    const {thought, tag} = await req.json();

    try {
        await connectToDB();

        const postToBeUpdated = await Thought.findById(params.id);

        if(!postToBeUpdated) return new Response("Post not found", { status: 404 });

        postToBeUpdated.thought = thought;
        postToBeUpdated.tag = tag;

        postToBeUpdated.save();

        return new Response(JSON.stringify(postToBeUpdated), { status: 200 });
    } catch (error) {
        return new Response('Failed to update post', { status: 500 });
    }
}


//DELETE
export const DELETE = async (req, {params}) => {

    try {
        await connectToDB();
        
        await Thought.findByIdAndRemove(params.id);

        return new Response('Post deleted successfully', { status: 200 });
    } catch (error) {
        return new Response('Failed to delete post', { status: 500 });
    }
}