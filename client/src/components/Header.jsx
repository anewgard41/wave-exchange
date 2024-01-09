import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("landing");

  const setCurrentPageHandler = (page) => setCurrentPage(page);

  console.log(currentPage);

  return (
    <header>
      <div className="header-container">
        {/* Title */}
        <h1 style={{ color: "#fffcf2", fontSize: "2.5rem" }}>
          <span style={{ color: "#EB5E28" }}>W</span>ave{" "}
          <span style={{ color: "#CCC5B9" }}>E</span>xchange
        </h1>
        {/* Nav */}
        <div className="nav-container">
          {loggedIn ? (
            <>
              {/* Log out */}
              <Link
                className={"nav-link"}
                key={1}
                to="/"
                // onClick={() => {
                //   currentPage === "signup"
                //     ? setCurrentPageHandler("landing")
                //     : setCurrentPageHandler("signup");
                // }}
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
