import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useAuth } from '../AuthContext';

emailjs.init('gaIPWPFawO27wj48O');


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
    const navigate = useNavigate();

    const [employeeId, setEmployeeId] = useState('');
    // const [email, setEmail] = useState('');
    // const [otp, setOtp] = useState('');
    const { setEmail, setOtp } = useAuth();


    const handleEmployeeIdChange = (e) => {
        setEmployeeId(e.target.value);

    }



    const handleResetPassword = async () => {
        try {
            // Fetch the email using the employee ID
            // const response = await axios.get(`/api/employees/${employeeId}`);
            // const fetchedEmail = response.data.email;

            const fetchedEmail = 'rishusingh9369@gmail.com';
            setEmail(fetchedEmail);

            // Generate an OTP
            const generatedOTP = generateOTP();
            setOtp(generatedOTP);
          

            // Send the OTP to the fetched email (you need a separate function for this)
            sendOtpToEmail(fetchedEmail, generatedOTP);


        } catch (error) {
            console.error(`Error while fetching email: ${error}`);
        }
    };



    const sendOtpToEmail = async (email, otp) => {

        try {
           
            const templateParams = {
                to_email: email,
                message: `Your OTP code is: ${otp}`,
            };

            const response = await emailjs.send('service_n4bi9ig', 'template_nwgeevz', templateParams);

            console.log('Email sent successfully', response);


            navigate('/otp-screen');

        } catch (error) {
            console.error('Error sending email:', error);
            alert("Error while sending the email check console for more detail");
        }

    }


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

                    <button className={"reset-button"} onClick={handleResetPassword}>Submit</button>

                    <NavLink className={"back-to-login"} to='/login'>Back to Login</NavLink>
                </div>


            </div>
        </div>
    )
}

export default ForgotPassword;