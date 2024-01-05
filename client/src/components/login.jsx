import React from 'react';
import { Layout, Input, Space, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const { Content } = Layout;
const layoutStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#252422', // Fixed the color value
};

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <Layout style={layoutStyle}>
      <Content style={layoutStyle}>
        {/* "Login" text */}
        <p style={{ color: '#CCC5B9', fontSize: '18px', marginBottom: '16px' }}>Login</p>
        {/* Username input */}
        <Input
          placeholder="Enter your username"
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Extra information">
              <InfoCircleOutlined
                style={{
                  color: 'rgba(0, 0, 0, 0.45)',
                }}
              />
            </Tooltip>
          }
        />

        {/* Password input with eye icon */}
        <Space direction="vertical">
          <Input.Password placeholder="Input password" />

          <Input.Password
            placeholder="Input password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Space>
      </Content>
    </Layout>
  );
};

export default LoginPage;