import React, { useState, useEffect } from "react";
import { Layout, Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { SongList } from "./SongList";
const { Search } = Input;
const { Content } = Layout;
import Header from "./Header.jsx";

const layoutStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#252422",
};

export function LyricSearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
      console.log(results);
    } catch (error) {
      console.error("Error searching from server:", error);
    }
  };

  return (
    <div>
      <Header />
      <Layout style={layoutStyle}>
        {/* Main content area */}
        <Content style={layoutStyle}>
          <p
            style={{ color: "#FFFCF2", fontSize: "36px", marginBottom: "10px" }}
          >
            Lyric Search
          </p>
          <Space
            direction="vertical"
            style={{ width: "100%", maxWidth: "300px" }}
          >
            <Space.Compact
              style={{
                width: "100%",
                maxWidth: "300px",
              }}
            >
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
          <p
            style={{ color: "#FFFCF2", fontSize: "24px", marginBottom: "10px" }}
          >
            Search Results
          </p>
          <SongList searchResults={searchResults} />
        </Content>
      </Layout>
    </div>
  );
}
