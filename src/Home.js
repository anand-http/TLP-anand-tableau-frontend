// src/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableauEmbed } from "@stoddabr/react-tableau-embed-live";

const Home = (accessToken) => {

  console.log(accessToken.accessToken);
  return (
    <div
      className="App"
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height:'100vh'
      }}
    >
      <h1>The Tableau Embedded API v3</h1>
      <h3>Now more lightweight, and backwards compatible!</h3>
      <TableauEmbed
      sourceUrl="https://eu-west-1a.online.tableau.com/#/site/dtdcexpress/views/GrowthKeyProductMix/GrowthKeyProductMix"
      token = {accessToken.accessToken}
      height='100vh'
       />
    </div>
  );
};

export default Home;
