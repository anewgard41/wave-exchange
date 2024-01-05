import React from 'react';
import { Input, Space } from 'antd';
const { Search } = Input;

const LandingPage = () => (
  // Vertical space to center content and take up full height of the viewport
  <Space direction="vertical" align="center" style={{ height: '100vh' }}>
    {/* Search input component */}
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