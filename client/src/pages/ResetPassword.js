import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const { confirmPassword, setConfirmPassword, ResetPassword } = useUser();
    const navigate = useNavigate();

    const Send = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password do not match, please try again");
            return;
        }
        await ResetPassword(token)
        toast.success('Reset Password succeed!');
        navigate('/login');
    };

    return (
        <div className="forgot-pass-container">
            <div className="forgot-pass-body">
                <div className="forgot-pass-main">
                    <h1 className="h1">Reset Password</h1>

                    <form id="forgotPasswordForm" onSubmit={Send}>
                        <label className="label" htmlFor="email">New password:</label>
                        <input
                            className="input"
                            type="password"
                            id="email"
                            name="email"
                            placeholder="Your new password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label className="label" htmlFor="email">Confirm password:</label>

                        <input
                            className="input"
                            type="password"
                            id="email"
                            name="email"
                            placeholder="Confirm password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        
                        <div className="wrap">
                            <button className="button" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword