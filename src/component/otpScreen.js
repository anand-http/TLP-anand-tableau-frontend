import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';

const OtpScreen = () => {
    const [otp, setOTP] = useState(['', '', '', '']); // Initialize an array of 4 empty strings

    const handleChange = (e, index) => {
        const newOTP = [...otp];
        newOTP[index] = e.target.value;
        setOTP(newOTP);
    };


    return (
        <div className='otp-screen-container'>
            <div className="otp-screen-main">
                <div className="otp-screen-main-heading">
                    <h1>OTP Verification</h1>
                    <h2>OTP sent SuccessFully</h2>
                    <p>Enter the OTP sent to hello@gmail.com</p>
                </div>

                <div className='otp-input'>
                    <input
                        type="text"
                        maxLength="1"
                        value={otp[0]}
                        onChange={(e) => handleChange(e, 0)}
                    />
                    <input
                        type="text"
                        maxLength="1"
                        value={otp[1]}
                        onChange={(e) => handleChange(e, 1)}
                    />
                    <input
                        type="text"
                        maxLength="1"
                        value={otp[2]}
                        onChange={(e) => handleChange(e, 2)}
                    />
                    <input
                        type="text"
                        maxLength="1"
                        value={otp[3]}
                        onChange={(e) => handleChange(e, 3)}
                    />
                </div>

                <div className="not-recieved-otp">
                    <span>Didn't receive the OTP?</span> 
                    <NavLink>Resend Otp</NavLink>
                </div>

                <div className="verify-otp">
                    <NavLink className={"otp-verify-button"}>
                        Verify
                    </NavLink>
                </div>
            </div>

        </div>
    )
}

export default OtpScreen;