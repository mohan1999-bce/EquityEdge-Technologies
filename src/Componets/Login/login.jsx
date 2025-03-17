import { useState } from 'react';
import '../styles/login.css';
import { ToastContainer, toast } from 'react-toastify';


const Login = ({ setUserInParentComponent }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === 'admin' && password === 'admin') {
            setUserInParentComponent((prevState) => ({
                ...prevState,
                user: username,
                isLoggedIn: true,
            }));
        } else {
            toast.error('Login failed! Please make sure your username and password are correct then retry.', {
                autoClose: false,
            });
        
            
        }
    }

    return (
        <div className='signin-container'>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" id="Email" name="Email" onChange={(event) => setUsername(event.target.value)} ></input>
                <label>Password</label>
                <input type="password" id="Password" name="Password" onChange={(event) => setPassword(event.target.value)} ></input>
                <input type="submit" value="Sign in"></input>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;