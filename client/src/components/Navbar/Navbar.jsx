import React, { useState, useEffect } from "react";
import logo from "../../assets/robot 1.png";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const [isSelectedLink, setIsSelectedLink] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // update active navbar link
    const currentPath = location.pathname;
    const isPlaying = currentPath.endsWith("/play");
    if (isPlaying) setIsSelectedLink(2);
  }, []);

  /* USER CLICKED A NAV LINK */
  const handleNavLinkClick = (index) => {
    if (index === 0) {
      setIsSelectedLink(0);
      navigate("/");
      return;
    }

    if (index === 1) {
      setIsSelectedLink(1);
      navigate("/about");
      return;
    }

    if (index === 2) {
      setIsSelectedLink(2);
      navigate("/play");
      return;
    }
  };
  return (
    <nav className="nav-container ">
      <div className="logo-container col flex">
        <img src={logo} alt="" />
        <p>ImageinateAI</p>
      </div>

      <div className="links-container col">
        <ul className="flex ls-2 ">
          <li>
            <p
              onClick={() => handleNavLinkClick(0)}
              className={`${isSelectedLink === 0 ? "active-link" : ""}`}
            >
              Home
            </p>
          </li>
          <li>
            <p
              onClick={() => handleNavLinkClick(1)}
              className={`${isSelectedLink === 1 ? "active-link" : ""}`}
            >
              About
            </p>
          </li>
          <li>
            <p
              onClick={() => handleNavLinkClick(2)}
              className={`${isSelectedLink === 2 ? "active-link" : ""}`}
            >
              Play
            </p>
          </li>
        </ul>
      </div>

      <div className="login-container col flex">
        {!user ? <button>Sign In</button> : ""}
      </div>
    </nav>
  );
};

export default Navbar;
