import React from "react";
import "../styles/Navbar.css"; // Import CSS file

import {Link} from "react-router-dom";
 
const Navbar = ({handLeLogout}) => {
    
    return (
        

        <nav className="navbar">
            {/* Logo Section */}
            <div className="logo">
                <span className="chart-icon">📊</span>

                <span className="brand-name">Equity Edge</span>

            </div>

            {/* Navigation Links */}
            <div className="nav-links">

                <Link to="/About">About</Link>
                <Link to="/Portfolio">Portfolio</Link>
                <Link to="/Market">Market</Link>
                
            </div>
            <div className='navbar-right'>
                <button onClick={()=>handLeLogout()} classname="navbar-button">Logout</button>

            </div>

            

        </nav>
    );
};

export default Navbar;
