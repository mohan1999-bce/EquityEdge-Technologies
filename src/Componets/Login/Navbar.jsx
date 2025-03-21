import React from "react";
import "../styles/Navbar.css"; // Import CSS file

import {Link} from "react-router-dom";
 
const Navbar = ({handLeLogout}) => {
    
    return (
        <nav className="navbar">
            <div className="brand-container">
                <img className="brand-img" src="./src/assets/equity-edge-logo.png" />
                <h1 className="brand-title">Equity Edge Technologies</h1>
            </div>
            <ul className="nav-links">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/market">Market</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
            </ul>
            <div className='logout-container'>
                <button onClick={()=>handLeLogout()} className="logout-button">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
