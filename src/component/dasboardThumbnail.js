import React from "react";
import Card from "./card";
import cardData from './data';



const DashboardThumbnail = () => {


    return (
        <>
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