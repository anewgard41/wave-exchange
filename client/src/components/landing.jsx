import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Avatar } from 'antd';
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const onSearch = (value, _e, info) => console.log(info?.source, value);

const LandingPage = () => (
  // Vertical space to center content and take up full height of the viewport
  <Space direction="vertical" align="center" style={{ height: '80vh' }}>
    {/* Image component */}
    <Avatar size={600} src="../images/waveexchange_logo.png"
    />
    
    <Search
      placeholder="input search text"
      enterButton="Search"
      size="large"
      suffix={suffix}
      onSearch={onSearch}
    />

    {/* Search input component - loading */}
    <Search
      placeholder="Input search text"  // Placeholder text when the input is empty
      enterButton="Search"  // Text on the submit button
      size="large"  // Size of the input field, set to 'large'
      loading  // Display a loading indicator on the button
      style={{ flex: 1, maxWidth: '300px' }}  // Flex styling to take available space, with a maximum width of 300px
    />
  </Space>
);

export default LandingPage;