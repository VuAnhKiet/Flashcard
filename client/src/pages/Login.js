import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

function Login() {
    const navigate = useNavigate();
    const [username, Setusername] = useState("");
    const [password, Setpassword] = useState("");
    const { Setauth } = useContext(AuthContext);
    const login = () => {
        const data = { fullname: username, password: password }
        axios.post("http://localhost:3001/auth/login", data).then((res) => {
            if (res.data.error) { 
                alert(res.data.error); 
            }
            else {
                localStorage.setItem("accessToken", res.data);
                Setauth(true);
                navigate('/')
            }
        })
    }
    return (
        <div className='body'>
            <div className="main">
                <h1 className='h1'>LOGIN</h1>
                <label className='label' htmlFor="first">Username:</label>
                <input className='input'
                    type="text"
                    id="first"
                    name="first"
                    placeholder="Enter your Username"
                    required=""
                    onChange={(e) => { Setusername(e.target.value) }}
                />
                <label className='label' htmlFor="password">Password:</label>
                <input className='input'
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your Password"
                    required=""
                    onChange={(e) => { Setpassword(e.target.value) }}
                />
                <div className="wrap">
                    <button className='button' type="submit" onClick={login}>
                        Login
                    </button>
                </div>
                <p>
                    Not registered?
                    <Link style={{ textDecoration: 'none' }} to='/registration'>Create an account</Link>
                </p>
            </div>
        </div>
    )
}

export default Login