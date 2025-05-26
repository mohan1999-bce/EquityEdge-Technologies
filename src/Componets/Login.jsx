import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import PropTypes from 'prop-types';

import "../styles/login.css"; // Import CSS file
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';

const Googin = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // For navigation
    
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        const base_url = 'http://127.0.0.1:5000'
        const url = `${base_url}/user/authenticate-user/${username}/${password}`
        fetch(url).then(res => {
            if (!res.ok) {
                setUser((prevState) => ({
                    ...prevState,
                    isLoggedIn: false,
                }));
                toast.error('Login failed! Please make sure your username and password are correct then retry.', {
                    autoClose: false,
                });
            } else {
                res.json().then(data => {
                    setUser((prevState) => ({
                        ...prevState,
                        user: data.username,
                        userId: data.id,
                        isLoggedIn: true,
                    }));
                    navigate('/home');
                })
            }
        }).catch((error) => {
            toast.error(`Failed to authenticate user ${username}: ${error}`)
        })
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
}

Googin.propTypes = {
    setUser: PropTypes.func.isRequired,
}

export default Googin;
