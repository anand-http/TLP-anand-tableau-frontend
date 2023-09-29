import React from "react";
import Card from "./card";
import cardData from './data';
import Sidebar from "./sidebar/Sidebar";






const DashboardThumbnail = () => {


    return (
        <>
        <Sidebar />
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