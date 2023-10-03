import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const NewPasswordScreen = () => {
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { employeeId, token } = useParams();


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSetNewPassword = async () => {
        if (newPassword === confirmPassword ) {
            try {
                const response = await axios.post(`http://localhost:3400/reset-password/${employeeId}/${token}`, {
                    employeeId,
                    token,
                    newPassword
                });
    
                if (response.data.Status === "Success") {
                    navigate('/');
                }
            } catch (error) {
                console.log(`${error}`);
            }
        } else {
            alert("Passwords do not match or do not meet the criteria.");
        }
    };
    

    return (
        <div className='new-password-screen-container'>
            <div className="new-password-screen-main">
                <div className="new-password-screen-main-heading">
                    <h1>New Password</h1>
                </div>

                <div className="password-input">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
