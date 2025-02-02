import React from "react";
import "../../styles/home.css"; // Adjust or import a dedicated footer CSS if desired

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Video Game Store. All rights reserved.</p>
      </div>
    </footer>
  );
};
