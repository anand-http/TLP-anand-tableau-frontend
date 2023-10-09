// src/Home.js
import React, { useState, useEffect, useRef } from 'react';
import {
  TableauEmbed,
  FilterUpdateType,
} from "@stoddabr/react-tableau-embed-live";
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

const Home = () => {

  const [tableauJWT, setTableauJWT] = useState('');
  const [userRegion, setUserRegion] = useState('');
  const [vizloadCompleted, setVizLoadCompleted] = useState(false);
  const vizRef = useRef(null);
  const location = useLocation();
  const { linkUrl } = location.state || {};

  const accessToken = localStorage.getItem('accessToken');


  function checkIfRefWorkbbokDefined() {
    console.log(vizRef.current.workbook);
    try {
      const viz = vizRef.current;
      const workbook = viz.workbook;
      const activeSheet = workbook.activeSheet;
      if (vizRef.current.workbook._workbookImpl) {
        setVizLoadCompleted(true);
        console.log(`${vizRef.current.workbook._workbookImpl}`)
        console.log('viz is loaded');
        addRegion();
      }
    } catch (err) {
      console.log('viz not loaded yet')
      setTimeout(() => {
        checkIfRefWorkbbokDefined()

      }, 1000);
    }
  }

  useEffect(() =>
    async function vizloadCompletedOrNot() {
      console.log("called", vizRef);
      if (vizRef && vizRef.current) {
        console.log('vizref value has changed')
        if (vizloadCompleted) {
          console.log('viz has loaded');

        } else {
          console.log('viz is not loaded')
          checkIfRefWorkbbokDefined();
        }
      }
    }, [vizRef.current])
  


    const fetchUserRegion = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3400/fetchregion',
          {
            username: "samay123",
          }
        );
        const region = (response.data.region);
        setUserRegion(region);  
        console.log(`userRegion: ${userRegion}`);
      } catch (error) {
        console.error('Error fetching user region', error);
      }
    };

    fetchUserRegion();


  async function addRegion() {
    console.log("called", vizRef);
    if (vizRef && vizRef.current) {
      console.log('button is clicked')
      console.log(vizRef.current.workbook);

      const viz = vizRef.current;
      const workbook = viz.workbook;
      const activeSheet = workbook.activeSheet;
      await activeSheet.applyFilterAsync(
        "Region",
        [userRegion || "AMD"],
        FilterUpdateType.Replace
      );
    }
    console.log(`userRegion::${userRegion}`);
  }

  useEffect(() => {
    const fetchTableauJWT = async () => {
      try {

        const response = await axios.get('http://15.206.174.83:3500/tableauJWT', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        // console.log(response.data);
        setTableauJWT(response.data.token);

        // console.log(tableauJWT);
      } catch (error) {
        console.error('Error fetching tableauJWT', error);
      }
    };

    fetchTableauJWT();
  }, [accessToken]);



  return (
    <div
      style={{ height: "100vh" }}
    >
      <div className="backButton">

        <Link to='/' className='backLink'>
          Back
        </Link>
      </div>
      < >
        <TableauEmbed
          sourceUrl={linkUrl}
          token={tableauJWT}
          height='100vh'
          ref={vizRef}
        />
      </>


    </div>
  );
};

export default Home;