// src/Home.js
import React, { useState, useEffect } from 'react';
import { TableauEmbed } from "@stoddabr/react-tableau-embed-live";
import axios from 'axios';

import { useLocation } from 'react-router-dom';


const Home = () => {

  const [linkUrlState, setLinkUrlState] = useState('');
  const [tableauJWT, setTableauJWT] = useState('');

  const accessToken = localStorage.getItem('accessToken');
  // console.log(`this is the accessToken of home.js file ${accessToken}`);




  useEffect(() => {
    const fetchTableauJWT = async () => {
      try {
        
        const response = await axios.get('http://15.206.174.83:3500/tableauJWT', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

      console.log(response.data);
        setTableauJWT(response.data.token);
        
        console.log(tableauJWT);
      } catch (error) {
        console.error('Error fetching tableauJWT', error);
      }
    };

    fetchTableauJWT();
  }, [accessToken]);


  const location = useLocation();

  const { linkUrl } = location.state || {};
  // console.log(`this is link Url ${linkUrl}`)

  useEffect(() => {

    if (linkUrl) {
      setLinkUrlState(linkUrl);
    }
  }, [linkUrl]);

  // console.log(accessToken);


  // console.log(` this is linkUrl bottom of useEffect ${linkUrl}`)

  return (
    <div
    >
      <h1>The Tableau Embedded API v3</h1>
      <h3>Now more lightweight, and backwards compatible!</h3>


      <TableauEmbed
        sourceUrl={linkUrl}
        token={tableauJWT}
        height='100vh'
      />




    </div>
  );
};

export default Home;
