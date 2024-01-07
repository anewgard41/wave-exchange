import React, { useState } from "react";
import { Button } from "antd";
import Auth from "../utils/auth";

function DonatePage() {
  const [size, setSize] = useState("large");

  const handleDonation = (amount) => {
    console.log(`Donated $${amount}`);
  }

  return (
      <div className="donate-layout">
        <section className="donate-section">
          <div className="donations">
            <h2 style={{ color: "#fffcf2", fontSize: "1.8rem" }}>Donate</h2>
            <div className="donate-btn-container">
              <Button
                type="primary"
                size={size}
                style={{ backgroundColor: "#EB5E28" }}
                onClick={() => handleDonation(5)}
              >
                $5
              </Button>
              <Button
                type="primary"
                size={size}
                style={{ backgroundColor: "#EB5E28" }}
                onClick={() => handleDonation(10)}
              >
                $10
              </Button>
              <Button
                type="primary"
                size={size}
                style={{ backgroundColor: "#EB5E28" }}
                onClick={() => handleDonation(20)}
              >
                $20
              </Button>
              <Button
                type="primary"
                size={size}
                style={{ backgroundColor: "#EB5E28" }}
                onClick={() => handleDonation(50)}
              >
                $50
              </Button>
            </div>
          </div>
        </section>
        <section className="donate-section">
          <div className="leaderboard">
            <h2 style={{ color: "#fffcf2", fontSize: "1.8rem" }} >Leaderboard</h2>
            <div className="leaderboard-names-container">
              <p>Fake Name</p>
              <p>Fake Name</p>
              <p>Fake Name</p>
              <p>Fake Name</p>
            </div>
          </div>
        </section>
      </div>
  );
}

export default DonatePage;
