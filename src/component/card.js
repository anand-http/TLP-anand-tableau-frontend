import React from 'react';

const Card = ({ imageUrl, linkUrl, title }) => {
    return (
        <div className="card">

            <div className='card-images'>

                <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                    <img width={"100%"} src={imageUrl} alt="Pic" />
                </a>

            </div>
            <div className="card-title">
                <h3>{title}</h3>
            </div>

        </div>
    );
};

export default Card;