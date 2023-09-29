"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("uid");

  // retrieve thoughts of logged in user
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const userThoughts = await response.json();

      setPosts(userThoughts);
    };

    if (userId) fetchPosts();
  }, [userId]);

  const handleEdit = (post) => {
    router.push(`/update-thought?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const confirmDeletion = confirm(
      "Are you sure you want to delete this thought?"
    );

    if (confirmDeletion) {
      try {
        await fetch(`/api/thought/${post._id.toString()}`, {
          method: "DELETE",
        });

        //remove the deleted post from the feed
        setPosts(posts.filter((p) => p._id !== post._id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
