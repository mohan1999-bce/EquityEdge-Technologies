import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/sytles.css"; // Import the corresponding CSS file

const TradeProLogin = ({ setUserInParentComponent }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        if (email === "admin" && password === "admin") {
            setUserInParentComponent((prevState) => ({
                ...prevState,
                user: email,
                isLoggedIn: true,
            }));
        } else {
            toast.error(
                "Login failed! Please make sure your username and password are correct then retry.",
                { autoClose: false }
            );
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="left-section">
                    <h2 className="platform-label">Financial Markets Platform</h2>
                    <h1 className="main-heading">Trade smarter, not harder</h1>
                    <p className="subtext">
                        Access real-time data, advanced charting, and powerful trading tools in one
                        intuitive platform.
                    </p>
                    <div className="features">
                        <div className="feature">
                            <span className="feature-icon">📊</span>
                            <div>
                                <h3>Real-time data</h3>
                                <p>Stay updated with market moves</p>
                            </div>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">📈</span>
                            <div>
                                <h3>Advanced analytics</h3>
                                <p>Make data-driven decisions</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-section">
                    <form onSubmit={handleLogin} className="login-form">
                        <h2 className="form-title">Welcome back</h2>
                        <p className="form-subtext">Enter your credentials to access your account</p>
                        
                        {/* Email Input */}
                        <label>Email</label>
                        <div className="input-box">
                            <Mail className="icon" />
                            <input
                                type="text"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <label>Password</label>
                        <div className="input-box">
                            <Lock className="icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {showPassword ? (
                                <EyeOff className="icon-right" onClick={() => setShowPassword(false)} />
                            ) : (
                                <Eye className="icon-right" onClick={() => setShowPassword(true)} />
                            )}
                        </div>

                        <div className="extra-options">
                            <label>
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="/" className="forgot-password">Forgot password?</a>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="login-button">
                            Sign in <ArrowRight className="arrow-icon" />
                        </button>

                        <p className="signup-text">
                            Don't have an account? <a href="/">Create account</a>
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default TradeProLogin;
