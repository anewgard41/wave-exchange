import React from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space, Avatar } from "antd";
import { useNavigate } from "react-router";
const { Search } = Input;

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
    <>
      {/* Vertical space to center content and take up full height of the
      viewport*/} 
      <Space direction="vertical" align="center" style={{ height: "80vh" }}>
        {/* Image component */}
        <Avatar size={600} src="src\images\waveexchange_logo.png" />

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
    </>
  );
};

export default LandingPage;
