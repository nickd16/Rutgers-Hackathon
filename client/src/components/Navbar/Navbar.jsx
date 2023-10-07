import React, {useState, useEffect} from 'react'
import logo from "../../assets/robot 1.png"
import "./Navbar.css";
import {useSelector} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";

const Navbar = () => {
    const user = useSelector((state) => state.auth.user);
    const [isSelectedLink, setIsSelectedLink] = useState(0);
    const location = useLocation();

    useEffect(() => {
        // update active navbar link
        const currentPath = location.pathname;
        const isPlaying = currentPath.endsWith("/play");
        if(isPlaying) setIsSelectedLink(2);
    }, [])
  return (
    <nav className='nav-container '>
        <div className='logo-container col'>
            <img src={logo} alt="" />
        </div>

        <div className="links-container col">
            <ul className='flex ls-2 '>
                <li>
                    <p onClick={() => setIsSelectedLink(0)} className={`${isSelectedLink === 0 ? "active-link" : ''}`}>Home</p>
                </li>
                <li>
                    <p onClick={() => setIsSelectedLink(1)} className={`${isSelectedLink === 1 ? "active-link" : ''}`}>About</p>
                </li>
                <li>
                    <p onClick={() => setIsSelectedLink(2)} className={`${isSelectedLink === 2 ? "active-link" : ''}`}>Play</p>
                </li>
            </ul>
        </div>

        <div className="login-container col flex">
            {!user ? <button>Sign In</button> : ""}
        </div>
        
    </nav>
  )
}

export default Navbar