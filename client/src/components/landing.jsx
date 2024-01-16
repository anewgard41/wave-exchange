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
    <>
      {/* Vertical space to center content and take up full height of the viewport */}
      <Space direction="vertical" align="center" style={{ height: "80vh" }}>
        {/* Avatar (Image) component */}
        <Avatar size={600} src="../src/images/waveexchange_logo.png" />

        {/* Search Input component */}
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          suffix={suffix} // Icon displayed on the right side of the search input
          onSearch={(value) =>
            navigate(`/search?lyricText=${encodeURIComponent(value)}`)
          } // Navigate to the search page with the entered search text
        />
      </Space>
    </>
  );
};

export default LandingPage;
