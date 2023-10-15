import Thought from '@models/thought';
import User from '@models/user';

const { connectToDB } = require('@utils/database');

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const search = decodeURIComponent(params.search);

    // Find users whose username matches the search term
    const users = await User.find({ username: { $regex: search, $options: 'i' } });

    // Get the IDs of the users
    const userIds = users.map(user => user._id);

    // Find posts whose tag or content matches the search term
    const posts = await Thought.find({
      $or: [
        { thought: { $regex: search, $options: 'i' } },
        { tag: { $regex: search, $options: 'i' } },
        { creator: { $in: userIds } }
      ]
    }).populate('creator');

    return new Response(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch posts', { status: 500 })
  }
}