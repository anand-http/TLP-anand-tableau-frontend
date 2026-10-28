import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import {useNavigate} from 'react-router-dom';

const NewPasswordScreen = () => {
    const navigate = useNavigate();

    const { email } = useAuth();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSetNewPassword = () => {

        if (newPassword === confirmPassword && newPassword.length >= 6) {
   
            alert("Password updated successfully!");
            navigate('/')
        } else {
            alert("Passwords do not match or do not meet the criteria.");
        }
    };

    return (
        <div className='new-password-screen-container'>
            <div className="new-password-screen-main">
                <div className="new-password-screen-main-heading">
                    <h1>New Password</h1>
                    <p>Set a new password for your account associated with {email}</p>
                </div>

                <div className="password-input">
                    <input
                        type={showPassword ? "text" : "password"} // Toggle password visibility
                        placeholder="New Password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    <button className='togglePassword' onClick={togglePasswordVisibility}>
                        {showPassword ? "Hide Password" : "Show Password"}
                    </button>
                </div>

                <div className="set-password-button">
                    <button onClick={handleSetNewPassword}>Set New Password</button>
                </div>
            </div>
        </div>
    );
};

export default NewPasswordScreen;
