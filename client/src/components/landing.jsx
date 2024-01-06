import React from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space, Avatar } from "antd";
import { useNavigate } from "react-router";
const { Search } = Input;
import Header from "./Header.jsx";

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#242522",
    }}
  />
);

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="body-container">
      <Header />
      {/* Vertical space to center content and take up full height of the
      viewport*/} 
      <Space direction="vertical" align="center" style={{ height: "80vh" }}>
        {/* Image component */}
        <Avatar size={600} src="../images/waveexchange_logo.png" />

        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          suffix={suffix}
          onSearch={(value) =>
            navigate(`/search?lyricText=${encodeURIComponent(value)}`)
          }
        />
      </Space>
    </div>
  );
};

export default LandingPage;
