import React from 'react';
import { Layout, Input, Space, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const { Content } = Layout;
const layoutStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#252422',
};

const SignupPage = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <Layout style={layoutStyle}>
      <Content style={layoutStyle}>
        {/* "Sign Up Today" text */}
        <p style={{ color: '#FFFCF2', fontSize: '18px', marginBottom: '16px' }}>Sign Up Today</p>
        {/* Username input */}
        <Space direction="vertical" style={{ width: '100%', maxWidth: '300px' }}>
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
          <Input.Password
            placeholder="Input password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Space>
      </Content>
    </Layout>
  );
};

export default SignupPage;
