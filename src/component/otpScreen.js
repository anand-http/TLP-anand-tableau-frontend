import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

emailjs.init('gaIPWPFawO27wj48O');

const OtpScreen = () => {
    const navigate = useNavigate();

    const {email, otp } = useAuth();
    // console.log("otp of otpScreen:",otp);
    const [otpinput, setOtpinput] = useState(['', '', '', '']); // Initialize an array of 4 empty strings

    const handleChange = (e, index) => {
        const newOTP = [...otpinput];
        newOTP[index] = e.target.value;
        setOtpinput(newOTP);
    };
  
    const handleResendOtp = async (email,otp)=>{
        try {
           
            const templateParams = {
                to_email: email,
                message: `Your OTP code is: ${otp}`,
            };

            const response = await emailjs.send('service_n4bi9ig', 'template_nwgeevz', templateParams);

            console.log('Email sent successfully', response);

            alert("Otp Resend Plz check your mail");


        } catch (error) {
            console.error('Error sending email:', error);
            alert("Error while sending the email check console for more detail");
        }
    }

    const VerifyOtp = () => {
        // Combine the OTP digits from the input fields
        const enteredOTP = otpinput.join('');
    
      
    
        if (enteredOTP === otp) {
        
            navigate('/new-password');
            // alert("OTP verification successful!");
        
        } else {
           
            alert("Invalid OTP. Please try again.");
        }
    };
    

    return (
        <div className='otp-screen-container'>
            <div className="otp-screen-main">
                <div className="otp-screen-main-heading">
                    <h1>OTP Verification</h1>
                 
                  <p>We have sent a code to your email {email}</p>
                </div>

                <div className='otp-input'>
                    <input
                        type="text"
                        maxLength="1"
                        value={otpinput[0]}
                        onChange={(e) => handleChange(e, 0)}
                    />
                    <input
                        type="text"
                        maxLength="1"
                        value={otpinput[1]}
                        onChange={(e) => handleChange(e, 1)}
                    />
                    <input
                        type="text"
                        maxLength="1"
                        value={otpinput[2]}
                        onChange={(e) => handleChange(e, 2)}
                    />
                    <input
                        type="text"
                        maxLength="1"
                        value={otpinput[3]}
                        onChange={(e) => handleChange(e, 3)}
                    />
                </div>

                <div className="not-recieved-otp">
                    <span>Didn't receive the OTP?</span> 
                    <NavLink onClick={()=> handleResendOtp(email,otp)}>Resend Otp</NavLink>
                </div>

                <div className="verify-otp">
                    <button className={"otp-verify-button"} onClick={VerifyOtp}>
                        Verify
                    </button>
                </div>
            </div>

        </div>
    )
}

export default OtpScreen;