import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import nodemailer from 'nodemailer';


function generateOTP() {
    const length = 4;
    const charset = '0123456789';

    let otp = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        otp += charset[randomIndex];
    }

    return otp;
}

const ForgotPassword = () => {
    const Navigate = useNavigate();

    const [employeeId, setEmployeeId] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');


    const handleEmployeeIdChange = (e) => {
        setEmployeeId(e.target.value);

    }



    const handleResetPassword = async () => {
        try {
            // Fetch the email using the employee ID
            const response = await axios.get(`/api/employees/${employeeId}`);
            const fetchedEmail = response.data.email;

            // Generate an OTP
            const generatedOTP = generateOTP();
            setOtp(generatedOTP);

            // Send the OTP to the fetched email (you need a separate function for this)
            sendOtpToEmail(fetchedEmail, generatedOTP);

            // Navigate to OTP screen or display a success message

            Navigate('/otp-screen');
        } catch (error) {
            console.error(`Error while fetching email: ${error}`);
        }
    };



    const sendOtpToEmail = async (email, otp) => {
        try {
            // Create a nodemailer transporter with your email service provider's configuration
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'rishusingh9369@gmail.com',
                    pass: 'rishu9369',
                },
            });
            // Define the email content
            const mailOptions = {
                from: 'rishusingh9369@gmail.com',
                to: email,
                subject: 'OTP for Password Reset',
                text: `Your OTP for password reset is: ${otp}`,
            };
            await transporter.sendMail(mailOptions);

            console.log(`OTP sent to ${email} successfully.`);

        } catch (error) {
            console.error(`Error while sending OTP email: ${error}`);
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
                    <label >Employee Id</label>
                    <br />
                    <input value={employeeId} type="text" name="" id="" onChange={handleEmployeeIdChange} />
                </div>


                <div className="reset-button-div">

                    <NavLink className={"reset-button"} to={'/otp-screen'} onClick={handleResetPassword}>Reset your password</NavLink>

                    <NavLink className={"back-to-login"} to='/login'>Back to Login</NavLink>
                </div>


            </div>
        </div>
    )
}

export default ForgotPassword;