import React from "react";
import "../styles/Navbar.css"; // Import CSS file

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* Logo Section */}
            <div className="logo">
                <span className="chart-icon">📊</span>
                <span className="brand-name">TradePro</span>
            </div>

            {/* Navigation Links */}
            <div className="nav-links">
                <a href="/">Features</a>
                <a href="/">Pricing</a>
                <a href="/">Login Templates</a>
                <a href="/">Contact</a>
            </div>

            {/* API Docs Button */}
            <div className="api-docs">
                <a href="/" className="api-button">
                    API Docs ↗
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
