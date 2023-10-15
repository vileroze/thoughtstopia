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
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState("");

  const fetchAllPosts = async () => {
    const response = await fetch("/api/thought/all");
    const allthoughts = await response.json();

    setPosts(allthoughts);
  };

  const fetchFilteredPosts = async (searchText) => {
    const response = await fetch(`/api/thought/search/${searchText}/posts`);
    const filteredPosts = await response.json();
    setFilteredPosts(filteredPosts);
  };

  // search for thoughts
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    if (e.target.value.trim() === "") {
      console.log("Search input is empty");
      fetchAllPosts();
      setFilteredPosts(null);
    } else {
      // debounce method
      setSearchTimeout(
        setTimeout(() => {
          fetchFilteredPosts(e.target.value);
        }, 500)
      );
    }
  };

  const handleTagClick = (tag) => {
    clearTimeout(searchTimeout);
    setSearchText(tag);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        fetchFilteredPosts(tag);
      }, 500)
    );
  };

  // retrieve thoughts on page load
  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={e => { e.preventDefault(); }}>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          
          className="search_input peer"
          placeholder="Search for tags or usernames"
          required
        />
      </form>
      {filteredPosts ? (
        <ThoughtCardList
          posts={filteredPosts}
          handleTagClick={handleTagClick}
        />
      ) : (
        <ThoughtCardList posts={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
