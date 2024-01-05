import React from 'react';
import { Input, Space, Avatar } from 'antd';
import { useNavigate } from 'react-router';
const { Search } = Input;

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    // Vertical space to center content and take up full height of the viewport
    <Space direction="vertical" align="center" style={{ height: '100vh' }}>
      {/* Image component */}
      <Avatar size={600} src="../images/waveexchange_logo.png"
      />
  
      {/* Search input component */}
      <Search
        placeholder="Input search text"  // Placeholder text when the input is empty
        enterButton="Search"  // Text on the submit button
        size="large"  // Size of the input field, set to 'large'
        style={{ flex: 1, maxWidth: '300px' }}  // Flex styling to take available space, with a maximum width of 300px
        onSearch={(value) => navigate(`/search?lyricText=${encodeURIComponent(value)}`)}
      />
    </Space>
  )
};

export default LandingPage;