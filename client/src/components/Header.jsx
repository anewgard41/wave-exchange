import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [currentPage, setCurrentPage] = useState("landing");

  const setCurrentPageHandler = (page) => setCurrentPage(page);

  console.log(currentPage);

  return (
    <header>
      <div className="header-container">
        <h1 style={{ color: "#fffcf2", fontSize: "2.5rem" }}>
          <span style={{ color: "#EB5E28" }}>W</span>ave{" "}
          <span style={{ color: "#CCC5B9" }}>E</span>xchange
        </h1>
        <div className="nav-container">
          <Link
            className={
              currentPage === "signup" ? "nav-link active" : "nav-link"
            }
            key={1}
            {...(currentPage === "signup" ? { to: "/" } : { to: "/signup" })}
            onClick={() => {
              currentPage === "signup"
                ? setCurrentPageHandler("landing")
                : setCurrentPageHandler("signup");
            }}
          >
            {currentPage === "signup" ? "Home" : "Sign Up"}
          </Link>
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
          <Link
            className={
              currentPage === "donate" ? "nav-link active" : "nav-link"
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
