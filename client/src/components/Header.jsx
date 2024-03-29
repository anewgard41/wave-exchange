import "../css/Header.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";

import Auth from "../utils/auth";

// Header component for navigation
function Header() {
  // State to track the current page
  const [currentPage, setCurrentPage] = useState("landing");

  // Function to set the current page
  const setCurrentPageHandler = (page) => setCurrentPage(page);

  // Render the Header component
  return (
    <header>
      <div className="header-container">
        {/* Title */}
        <div className="title-container">
          {/* Animation */}
          <span>
            <UseAnimations animation={activity} size={76} />
          </span>
          <h1 className="title" style={{ color: "#fffcf2" }}>
            <span style={{ color: "#EB5E28" }}>W</span>ave{" "}
            <span style={{ color: "#CCC5B9" }}>E</span>xchange
          </h1>
        </div>

        {/* Navigation */}
        <div className="nav-container">
          {/* User is logged in */}
          {Auth.loggedIn() ? (
            <>
              {/* Log out */}
              <Link
                className={"nav-link"}
                key={1}
                onClick={() => Auth.logout()}
              >
                Logout
              </Link>
              {/* My Songs */}
              <Link
                className={
                  currentPage === "songs" ? "nav-link active" : "nav-link"
                }
                key={2}
                {...(currentPage === "songs"
                  ? { to: "/" }
                  : { to: "/myaccount" })}
                onClick={() => {
                  currentPage === "songs"
                    ? setCurrentPageHandler("landing")
                    : setCurrentPageHandler("songs");
                }}
              >
                {currentPage === "songs" ? "Home" : "My Songs"}
              </Link>
            </>
          ) : (
            // User is not logged in
            <>
              {/* Sign Up */}
              <Link
                className={
                  currentPage === "signup" ? "nav-link active" : "nav-link"
                }
                key={1}
                {...(currentPage === "signup"
                  ? { to: "/" }
                  : { to: "/signup" })}
                onClick={() => {
                  currentPage === "signup"
                    ? setCurrentPageHandler("landing")
                    : setCurrentPageHandler("signup");
                }}
              >
                {currentPage === "signup" ? "Home" : "Sign Up"}
              </Link>
              {/* Login */}
              <Link
                className={
                  currentPage === "login" ? "nav-link active" : "nav-link"
                }
                key={2}
                {...(currentPage === "login" ? { to: "/" } : { to: "/login" })}
                onClick={() => {
                  currentPage === "login"
                    ? setCurrentPageHandler("landing")
                    : setCurrentPageHandler("login");
                }}
              >
                {currentPage === "login" ? "Home" : "Login"}
              </Link>
            </>
          )}
          {/* Donations */}
          <Link
            className={
              currentPage === "donate"
                ? "nav-link active"
                : "nav-link donate-link"
            }
            key={3}
            {...(currentPage === "donate" ? { to: "/" } : { to: "/donate" })}
            onClick={() => {
              currentPage === "donate"
                ? setCurrentPageHandler("landing")
                : setCurrentPageHandler("donate");
            }}
          >
            {currentPage === "donate" ? "Home" : "Donate"}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
