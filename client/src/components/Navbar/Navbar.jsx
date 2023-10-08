import React, { useState, useEffect } from "react";
import logo from "../../assets/robot 1.png";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { firebase, analytics } from "../../config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Axios from "axios";
import { setLogin, setLogout } from "../../state";
import { useDispatch } from "react-redux";
import profileIcon from "../../assets/profileIcon.png";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const [isSelectedLink, setIsSelectedLink] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // update active navbar link
    const currentPath = location.pathname;
    const isPlaying = currentPath.endsWith("/play");
    const isAbout = currentPath.endsWith("/about");
    if (isPlaying) setIsSelectedLink(2);
    if (isAbout) setIsSelectedLink(1);
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
  /* SIGN IN USER WITH GOOGLE */
  const signInWithGoogle = () => {
    const auth = getAuth(); // Get the Auth instance from Firebase
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const name = user.displayName;
        const email = user.email;

        const userData = {
          name: name,
          email: email,
        };

        Axios.post("http://127.0.0.1:5000/signup", userData)
          .then((response) => {
            const formattedNewUser = {
              email: response.data.email,
              name: response.data.name,
              average_score: response.data.average_score,
              wins: response.data.wins,
              games_played: response.data.games_played,
              captions_guessed: response.data.captions_guessed,
            };

            localStorage.setItem(
              "imageinate-user",
              JSON.stringify(formattedNewUser)
            );
            dispatch(setLogin(formattedNewUser));
            console.log("Response from the backend:", response.data);
          })
          .catch((error) => {
            // Handle errors from the Axios request
            console.error("Axios error:", error);
          });
      })

      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <nav data-aos="fade-down" className="nav-container ">
      <div className="logo-container col flex">
        <img src={logo} alt="" />
        <p>ImaginateAI</p>
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
        {!user ? (
          <button onClick={signInWithGoogle}>Sign In</button>
        ) : (
          <img src={profileIcon} alt="profile"></img>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
