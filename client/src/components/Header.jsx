import React, { useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

function Header() {
  const [size, setSize] = useState("middle");

  return (
    <div className="header-container">
      <h1>Wave Exchange</h1>
      <div className="nav-container">
        <Button type="primary" size={size}>
          Sign Up
        </Button>
        <button>Login</button>
        <button>Donate</button>
      </div>
    </div>
  );
}

export default Header;