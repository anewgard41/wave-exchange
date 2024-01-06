import React from 'react';
import { Layout, Carousel } from 'antd';

// Styling for the layout
const layoutStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#252422',
};

const UserPage = () => {
  return (
    <Layout style={layoutStyle}>
      {/* Main content area */}
      <Content style={layoutStyle}>
        {/* "Login" text */}
        <p style={{ color: '#FFFCF2', fontSize: '36px', marginBottom: '10px' }}>Saved Songs</p>
      </Content>
    </Layout>
  );
};

export default UserPage;
