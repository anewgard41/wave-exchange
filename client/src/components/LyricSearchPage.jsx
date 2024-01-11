import "../css/SearchPage.css";
import React, { useState, useEffect } from "react";
import { Button, Input, Space } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { SongList } from "./SongList";

export function LyricSearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const lyricText = params.get("lyricText");
    if (lyricText) {
      setSearchTerm(lyricText);
      setQuery(lyricText);
    }
  }, [search]);

  useEffect(() => {
    if (!query) return;
    handleSearch();
  }, [query]);

  const handleSearch = async () => {
    try {
      const results = await axios.get(
        `/api/search?lyricText=${encodeURIComponent(query)}`
      );
      setSearchResults(results.data);
      console.log(results.data);
    } catch (error) {
      console.error("Error searching from server:", error);
    }
  };

  return (
    <div className="search-page-container">
      {/* Main content area */}
      <div className="search-top">
        <h2
          style={{ color: "#FFFCF2", fontSize: "36px", marginBottom: "10px" }}
        >
          Lyric Search
        </h2>
        <Space
          direction="vertical"
        >
          <Space.Compact>
            <Input
              placeholder="Enter search term"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              type="primary"
              onClick={() => navigate(`?lyricText=${searchTerm}`)}
            >
              Search
            </Button>
          </Space.Compact>
        </Space>
        <h3
          style={{ color: "#FFFCF2", fontSize: "24px", marginBottom: "10px" }}
        >
          Search Results
        </h3>
      </div>
      <div className="results">
        {loading ? (
          <p>Loading...</p> // Display a loading indicator while fetching data
        ) : (
          <SongList searchResults={searchResults} />
        )}
      </div>
    </div>
  );
}
