import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Importing logout icon
import axios from "axios";
import "../../assets/styles/style.css"; // Importing styles

const Logout = () => {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login"); // Redirect to the login page
  };

  return (
    <button
      className={`logout-button ${showText ? "expanded" : ""}`}
      onClick={() => setShowText(!showText)}
      onBlur={() => setShowText(false)} // Hide text when clicking outside
    >
      <FiLogOut className="logout-icon" />
      {showText && <span className="logout-text" onClick={logout}>Logout</span>}
    </button>
  );
};

export default Logout;
