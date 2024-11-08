import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

function ForgotPassword() {
    const { email, setEmail, ResetLink } = useUser();

    const Send = async (e) => {
        e.preventDefault();
        await ResetLink();
    };

    return (
        <div className="forgot-pass-container">
            <div className="forgot-pass-body">
                <div className="forgot-pass-main">
                    <h1 className="h1">Forgot Password</h1>

                    <form id="forgotPasswordForm" onSubmit={Send}>
                        <label className="label" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="input"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className="wrap">
                            <button className="button" type="submit">
                                Send Reset Link
                            </button>
                        </div>
                    </form>

                    <div>
                        Remembered your password?
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            Go back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
