"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const UpdateThought = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    thought: "",
    tag: "",
  });

  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const thoughtId = searchParams.get("id");

  useEffect(() => {
    const getThought = async () => {
      const response = await fetch(`/api/thought/${thoughtId}`);
      const data = await response.json();
      setPost({ thought: data.thought, tag: data.tag });
    };

    if (thoughtId) getThought();
  }, [thoughtId]);

  const updateThought = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!thoughtId) return alert("Missing ThoughtId!");

    try {
      const resopnse = await fetch(`api/thought/${thoughtId}`, {
        method: "PATCH",
        body: JSON.stringify({
          thought: post.thought,
          tag: post.tag,
        }),
      });

      if (resopnse.ok) {
        router.push("/profile?uid="+session?.user.id);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateThought}
    />
  );
};

export default UpdateThought;
