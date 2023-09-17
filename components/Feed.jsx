"use client";

import { useEffect, useState } from "react";
import ThoughtCard from "./ThoughtCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

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
    </section>
  );
};

export default Feed;
