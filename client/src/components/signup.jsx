import React from 'react';
import { Layout, Input, Space, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const { Content } = Layout;

// Styling for the layout
const layoutStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#252422',
};

// SignupPage component
const SignupPage = () => {
  // State for managing the visibility of the password
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <Layout style={layoutStyle}>
      {/* Main content area */}
      <Content style={layoutStyle}>
        {/* "Sign Up Today" text */}
        <p style={{ color: '#FFFCF2', fontSize: '36px', marginBottom: '10px' }}>Sign Up Today</p>

        {/* Input components for username and password */}
        <Space direction="vertical" style={{ width: '100%', maxWidth: '300px' }}>
          {/* Username input */}
          <Input
            placeholder="Please enter username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              // Tooltip for extra information about the username input
              <Tooltip title="Username is case-sensitive">
                <InfoCircleOutlined
                  style={{
                    color: 'rgba(0, 0, 0, 0.45)',
                  }}
                />
              </Tooltip>
            }
          />

          {/* Password input with eye icon */}
          <Input.Password
            placeholder="Please enter password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Space>
      </Content>
    </Layout>
  );
};

export default SignupPage;