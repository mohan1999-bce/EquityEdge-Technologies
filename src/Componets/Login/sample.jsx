import React, { useState } from "react";
/*import { useNavigate } from "react-router-dom"; // For navigation*/

import "../styles/login1.css"; // Import CSS file
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
const Googin = ({ setUserInParentComponent }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // For navigation

    const handleLogin = (event) => {
        event.preventDefault();

        // Hardcoded admin credentials check
        if (email === "admin" && password === "admin")
            {
                setUserInParentComponent((prevState) => ({
                    ...prevState,
                    user: email,
                    isLoggedIn: true,
                }));
            }
            
     
        else {


            toast.error('Login failed!', {
                        autoClose: false,
                    });
                
                    
                }
            }

    return (
        <div className="login-page">
            <div className="login-container">
                <img src="./src/assets/equity-edge-logo.png" className="brand-logo" />
                <h1 className ="Name">Equity Edge Technologies</h1>
            

                <form onSubmit={handleLogin}>
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

                    {/* Submit Button */}
                    <button type="submit" className="login-button">
                        Sign in <ArrowRight className="arrow-icon" />
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Googin;
