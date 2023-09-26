import React, { createContext, useState } from "react";
import Card from "./card";
import cardData from './data';
import userIcon from '../assets/userIcon.png';
import logo from '../assets/logo-footer.png';


const DashboardThumbnail = ({ authenticated, setAuthenticated }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false);





    const toggleDropdown = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tableauJWT');

        setIsLoggedOut(true);
        setAuthenticated(false);

    };

    return (
        <>


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

            <div className="dashboard-thumbnail">
                {
                    cardData.map((card, index) => (
                        
                            <Card
                                key={index}
                                imageUrl={card.imageUrl}
                                linkUrl={card.linkUrl}
                                title={card.title}

                            />

                       
                    ))
                }
            </div>


        </>

    )
}

export default DashboardThumbnail;