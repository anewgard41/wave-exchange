import "../css/Donate.css";
import React, { useState } from "react";
import { Button, Avatar } from "antd";

// DonatePage component for handling donation-related functionality
function DonatePage() {
  // State to manage the size of donation buttons
  const [size, setSize] = useState("large");

  // Render the DonatePage component
  return (
    <div className="donate-layout">
      {/* Donation section */}
      <section className="donate-section">
        <div className="donations">
          {/* Donation heading */}
          <h2 style={{ color: "#fffcf2", fontSize: "1.8rem" }}>Donate</h2>
          {/* Donation buttons */}
          <div className="donate-btn-container">
            <Button
              type="primary"
              size={size}
              style={{ backgroundColor: "#EB5E28" }}
              href="/payment?amount=500"
            >
              $5
            </Button>
            <Button
              type="primary"
              size={size}
              style={{ backgroundColor: "#EB5E28" }}
              href="/payment?amount=1000"
            >
              $10
            </Button>
            <Button
              type="primary"
              size={size}
              style={{ backgroundColor: "#EB5E28" }}
              href="/payment?amount=2000"
            >
              $20
            </Button>
            <Button
              type="primary"
              size={size}
              style={{ backgroundColor: "#EB5E28" }}
              href="/payment?amount=5000"
            >
              $50
            </Button>
          </div>
          {/* Stripe logo */}
          <img className="stripe-logo" src="/images/stripe-logo.svg" />
        </div>
      </section>
      {/* Leaderboard section */}
      <section className="donate-section">
        <div className="leaderboard">
          {/* Leaderboard heading */}
          <h2 style={{ color: "#fffcf2", fontSize: "1.8rem" }}>
            Leaderboard
            <span style={{ color: "#EB5E28" }}>
              <br />
              *Coming Soon*
            </span>
          </h2>
          {/* Leaderboard names container */}
          <div className="leaderboard-names-container">
            {/* Placeholder for leaderboard content */}
            {/* const donors = []
                  const sortedDonors = donors.sort((a,b) => b - a); */}
            {/* or */}
            {/* {userData.donation.map((user) => {
                    return (
                      <p key={donation.donationId}>{user.name}</p>
                    )
                  })
                  } */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DonatePage;
