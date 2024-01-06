import React, { useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

function Header() {
  const [size, setSize] = useState("middle");

  return (
    <header>
      <div className="header-container">
        <h1 style={{ color: "#fffcf2", fontSize: "2.5rem" }}>
          <span style={{ color: "#EB5E28" }}>W</span>ave{" "}
          <span style={{ color: "#CCC5B9" }}>E</span>xchange
        </h1>
        <div className="nav-container">
          <Button
            type="primary"
            href="/signup"
            size={size}
            style={{ backgroundColor: "#EB5E28", color: "#252422" }}
          >
            Sign Up
          </Button>
          <Button
            type="primary"
            href="/login"
            size={size}
            style={{ backgroundColor: "#CCC5B9", color: "#252422" }}
          >
            Login
          </Button>
          <Button
            type="primary"
            href="/donate"
            size={size}
            style={{ backgroundColor: "#FFFCF2", color: "#252422" }}
          >
            Donate
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
