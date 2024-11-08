import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Custom Hooks
import { useUser } from '../hooks/useUser';

// Context
import AuthContext from '../AuthContext';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { Login, setUsername, setPassword, username, password } = useUser();
    const { Setauth } = useContext(AuthContext);
    const navigate = useNavigate();

    // Handle login form submission
    const login = async (e) => {
        e.preventDefault();
        const response = await Login();
        if (response.error) {
            toast.error(response.error);
            console.log(response.error);
        } else {
            localStorage.setItem("accessToken", response);
            Setauth(true);
            toast.success("Login successful! Welcome back!")
            navigate('/');
        }
    };

    // Toggle password visibility
    const toggleShowPassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    return (
        <div className="login-body">
            <div className="login-main">
                <h1 className="h1">LOGIN</h1>
                
                <form onSubmit={login}>
                    <label className="label" htmlFor="username">Username:</label>
                    <input
                        className="input"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your Username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label className="label" htmlFor="password">Password:</label>
                    <input
                        className="input"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Enter your Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                        <div>
                            <input
                                type="checkbox"
                                id="show-password"
                                checked={showPassword}
                                onChange={toggleShowPassword}
                            />
                            <label className="show-pass" htmlFor="show-password">Show password</label>
                        </div>
                        <Link to="/forgotpassword" style={{ textDecoration: 'none' }}>Forgot password?</Link>
                    </div>

                    <div className="wrap">
                        <button className="button" type="submit">
                            Login
                        </button>
                    </div>
                </form>

                <div>
                    Not registered? 
                    <Link to="/registration" style={{ textDecoration: 'none' }}>Create an account</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
