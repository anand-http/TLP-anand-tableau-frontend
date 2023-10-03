import React, { useState, useEffect } from 'react';
import userIcon from '../assets/userIcon.png';
import logo from '../assets/logo-footer.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Header = ({ setAuthenticated }) => {
    const { authenticatedState ,setAuthenticatedState } = useAuth();
    const navigate = useNavigate();

    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [isOpen, setIsOpen] = useState(false);



    useEffect(() => {
        // Check if the user is authenticated (you can implement your own logic)
        const isAuthenticated = localStorage.getItem('accessToken') !== null;

        setAuthenticatedState(isAuthenticated);
    }, []);


    const toggleDropdown = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tableauJWT');

        setIsLoggedOut(true);
        setAuthenticated(false);
        toggleDropdown()
        setAuthenticatedState(false);
        navigate('/');
    };


    return (
        <div className="dashboard-header">

            <div className="logo">
                <Link to='/' className='logo-link'>  <img src={logo} alt="Logo" /> </Link>

            </div>


            { authenticatedState &&
                <div className="header-right" >

                    <div className="user" onClick={toggleDropdown}>
                        <img src={userIcon} alt="userIcon" />
                    </div>

                    <div className="logout-dropdown" >
                        {
                            isOpen && (
                                <div className="dropdown-content">
                                    <button onClick={handleLogout} >Logout</button>
                                </div>
                            )}

                    </div>
                </div>
            }





        </div>
    )
}

export default Header;