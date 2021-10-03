import React from "react";
import { useHistory } from "react-router-dom";
import "./navbar.css";
import {
  FaAlignJustify,
  FaHome,
  FaHouseUser,
  FaSearch,
  FaSignOutAlt,
  FaTv,
  FaUsers,
} from "react-icons/fa";
import ICON from "../../assets/icon.png";

export default function Navbar({ user, setUser }) {
  let history = useHistory();

  const logout = () => {
    localStorage.setItem("user", null);
    setUser(null);
    history.push("/");
  };

  return (
    <div className="navbar-container">
      {/* Left */}
      <div className="nav-search-container">
        <img src={ICON} className="navbar-logo" alt="navbar-logo" />
        <div className="nav-search-container-input-bar">
          <FaSearch color="#ccc" />
          <input className="nav-search-text" placeholder="Search on Facebook" />
        </div>
      </div>

      {/* Middle */}
      <div className="nav-search-container menu-buttons">
        <FaHome />
        <FaTv />
        <FaHouseUser />
        <FaUsers />
        <FaAlignJustify />
      </div>

      {/* Right */}
      <div>
        {user ? (
          <div>
            <div className="chat-head-item-navbar">
              <div className="user-profile-pic-container">
                <p className="user-profile-pic-text">{user.email[0]}</p>
              </div>
              <div>
                <p className="user-name">{user.email}</p>
                <div className="log-out-button" onClick={logout}>
                  <FaSignOutAlt />
                  Log out
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="navbar-text">Login to use chat.</p>
          </div>
        )}
      </div>
    </div>
  );
}
