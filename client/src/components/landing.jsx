import "../css/Landing.css";
import React from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space, Avatar } from "antd";
import { useNavigate } from "react-router";

const { Search } = Input;

// Icon component for the search input
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#242522",
    }}
  />
);

// LandingPage component
const LandingPage = () => {
  // React Router's useNavigate hook for navigation
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Avatar (Image) component */}
      <Avatar className="logo" src="/images/waveexchange_logo.png" />
      {/* Search Input component */}
      <Search
        className="search-input"
        placeholder="input search text"
        enterButton="Search"
        size="large"
        suffix={suffix} // Icon displayed on the right side of the search input
        onSearch={(value) =>
          navigate(`/search?lyricText=${encodeURIComponent(value)}`)
        } // Navigate to the search page with the entered search text
      />
    </div>
  );
};

export default LandingPage;
