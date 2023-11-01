"use client";

import Form from "@components/Form";
import { PageWrapper } from "@components/page-wrapper";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ShareThought = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    thought: "",
    tag: "",
  });

  const createThought = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("api/thought/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          thought: post.thought,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <Form
        type="Share"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createThought}
      />
    </PageWrapper>
  );
};

export default ShareThought;
