import React, { useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Header from "./Header.jsx";

function DonatePage() {
  const [size, setSize] = useState("large");

  return (
    <div className="body-container">
      <Header/>
      <div className="donate-layout">
      <section className="donate-section">
        <div className="donations">
          <h2>Donate</h2>
          <div className="donate-btn-container">
          <Button type="primary" size={size}>
            $5
          </Button>
          <Button type="primary" size={size}>
            $10
          </Button>
          <Button type="primary" size={size}>
            $20
          </Button>
          <Button type="primary" size={size}>
            $50
          </Button>
          </div>
        </div>
      </section>
      <section className="donate-section">
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <div className="leaderboard-names-container">
            <p>
              Fake Name
            </p>
            <p>
              Fake Name
            </p>
            <p>
              Fake Name
            </p>
            <p>
              Fake Name
            </p>
          </div>
        </div>
      </section>
    </div>
    </div>
    
  );
}

export default DonatePage;
