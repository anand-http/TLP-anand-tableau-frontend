import React from 'react';
import '../App.css';

import { useNavigate } from 'react-router-dom';

const Card = ({ imageUrl, linkUrl, title,  }) => {

    const navigate = useNavigate();

    const handleCardClick = () => {
        
        navigate('/home', { state: { linkUrl } });
        // console.log("Clicked Card - linkUrl:", linkUrl);
    }


    return (
        <div className="card">


            <div className='card-images' onClick={handleCardClick}>

                {/* <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                </a> */}

                    <img width={"100%"} src={imageUrl} alt="Pic" />
                   {/* <a href={linkUrl}></a> */}

                {/* <img width={"100%"} src={imageUrl} alt="Pic" /> */}

            </div>



            <div className="card-title">
                <h3>{title}</h3>
            </div>


        </div >
    );
};

export default Card;