import React, { useState } from 'react';
import userIcon from '../assets/userIcon.png';
import logo from '../assets/logo-footer.png';


const Header = ({ setAuthenticated }) => {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tableauJWT');

        setIsLoggedOut(true);
        setAuthenticated(false);
        toggleDropdown()

    };


    return (
        <div className="dashboard-header">

                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>

                <div className="header-right" >

                    <div className="user" onClick={toggleDropdown}>
                        <img src={userIcon} alt="userIcon" />
                    </div>

                    <div className="logout-dropdown" >
                        {isOpen && (
                            <div className="dropdown-content">
                                <button onClick={handleLogout} >Logout</button>
                            </div>
                        )}

                    </div>
                </div>

            </div>
    )
}

export default Header;