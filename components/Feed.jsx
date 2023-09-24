"use client";

import { useEffect, useState } from "react";
import ThoughtCard from "./ThoughtCard";

const ThoughtCardList = ({ posts, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.map((post) => (
        <ThoughtCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  // search for thoughts
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // retrieve thoughts on page load
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/thought/all");
      const allthoughts = await response.json();

      setPosts(allthoughts);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          placeholder="Search for tags or usernames"
        />
      </form>

      <ThoughtCardList posts={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
