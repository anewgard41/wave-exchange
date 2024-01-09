import React, { useState } from "react";
import { Button, Avatar } from "antd";
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
                href="https://buy.stripe.com/test_4gwbIP0gb0EP2je4gg"
                target="_blank"
              >
                $5
              </Button>
              <Button
                type="primary"
                size={size}
                style={{ backgroundColor: "#EB5E28" }}
                onClick={() => handleDonation(10)}
                href="https://buy.stripe.com/test_bIYcMTgf93R1aPK9AB"
                target="_blank"
              >
                $10
              </Button>
              <Button
                type="primary"
                size={size}
                style={{ backgroundColor: "#EB5E28" }}
                onClick={() => handleDonation(20)}
                href="https://buy.stripe.com/test_cN2cMT6Ez87h7Dy28a"
                target="_blank"
              >
                $20
              </Button>
              <Button
                type="primary"
                size={size}
                style={{ backgroundColor: "#EB5E28" }}
                onClick={() => handleDonation(50)}
                href="https://buy.stripe.com/test_dR64gn7ID3R1f604gj"
                target="_blank"
              >
                $50
              </Button>
            </div>
            <img className="stripe-logo" src="src/images/stripe-logo.svg"/>
          </div>
        </section>
        <section className="donate-section">
          <div className="leaderboard">
            <h2 style={{ color: "#fffcf2", fontSize: "1.8rem" }} >Leaderboard</h2>
            <div className="leaderboard-names-container">
              {/* const donors = []
                  const sortedDonors = donors.sort((a,b) => b - a); */}
                  {/* or */}
                  {/* {userData.donation.map((user) => {
                    return (
                      <p key={donation.donationId}>{user.name}</p>
                    )
                  })
                  } */}
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
