import React, { useState } from "react";
import { Link } from "react-router-dom";
function Dropdown({ handleLogoutClick, userName }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="dropdown">
      <button
        className="dropdown-btn"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        Dropdown
        <img src="/down-arrow.png" alt="dropdown icon" />
      </button>
      {showDropdown && (
        <div className="link-box">
          <div>
            <a
              href="#"
              onClick={() => {
                handleLogoutClick();
              }}
            >
              Logout
            </a>
          </div>
          <div>
            <Link to="/create"> CreateBlog </Link>
          </div>
          <div>
            <Link to="/own-blogs"> PersonelBlogs </Link>
          </div>
          <div className="user-name">
            <a>{userName}</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
