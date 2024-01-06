import React, { useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

function Header() {
  const [size, setSize] = useState("middle");

  return (
    <header>
      <div className="header-container">
        <h1>Wave Exchange</h1>
        <div className="nav-container">
          <Button className="signup-button" type="primary" size={size}>
            Sign Up
          </Button>
          <Button className="login-button" type="primary" size={size}>
            Login
          </Button>
          <Button className="donate-button" type="primary" size={size}>
            Donate
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
