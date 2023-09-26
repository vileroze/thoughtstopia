import Thought from '@models/thought';
const { connectToDB } = require('@utils/database');

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const posts = await Thought.find({
      $or: [
        { thought: { $regex: params.search, $options: 'i' } },
        { tag: { $regex: params.search, $options: 'i' } }
      ]
    }).populate('creator');

    // if (!posts || posts.length === 0) 
    //   return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    return new Response(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch posts', { status: 500 })
  }
}