import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setError('');
        setMessage('');
        if (!employeeId) {
            setError('Employee Id is required.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3400/employeeid`, {
                username: employeeId,
            });

            if (response.status === 200) {
                setMessage('Password reset email sent successfully');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred while processing your request.');
            }
        }
    };

    return (
        <div className="forget-pswd-container">
            <div className="forget-pswd-main">
                <div className="reset-pswd-heading">
                    <h1>Forgot your password</h1>
                    <p>Please enter the Employee Id</p>
                </div>
                <div className="reset-pswd-input">
                    <label>Employee Id</label>
                    <br />
                    <input value={employeeId} type="text" onChange={(e) => setEmployeeId(e.target.value)} />
                    {error && <p style={{ color: 'red', marginTop: 13 }}>{error}</p>}
                    {message && <p style={{ color: 'green', marginTop: 13 }}>{message}</p>}
                </div>
                <div className="reset-button-div">
                    <button className={"reset-button"} onClick={handleSubmit}>Submit</button>
                    <NavLink className={"back-to-login"} to='/'>Back to Login</NavLink>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
