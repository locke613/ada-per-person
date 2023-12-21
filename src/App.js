import React, { useEffect, useState } from 'react';
import Header from './Header';
import SupportUsPage from './SupportUs';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [worldPopulation, setWorldPopulation] = useState(null);
  const [adaPrice, setAdaPrice] = useState(null);
  const [adaTotalSupply, setAdaTotalSupply] = useState(null);
  const [adaToPopulationRatio, setAdaToPopulationRatio] = useState(null);
  const textStyle = {
    fontSize: '16px',
    lineHeight: 'normal',
    fontFamily: 'Oswald',
  };
  const numStyle = {
    fontSize: '28px',
    lineHeight: 'normal',
    fontFamily: 'Oswald',
  };

  useEffect(() => {
    const fetchWorldPopulation = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (response.ok) {
          const data = await response.json();
          const totalPopulation = data.reduce((acc, country) => acc + country.population, 0);
          setWorldPopulation(totalPopulation);
        } else {
          console.error('Failed to fetch world population');
        }
      } catch (error) {
        console.error('Error fetching world population:', error);
      }
    };

    fetchWorldPopulation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWorldPopulation(prevPopulation => (prevPopulation !== null ? prevPopulation + 3 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {

    const fetchAdaPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd');
        if (response.ok) {
          const data = await response.json();
          setAdaPrice(data.cardano.usd);
        } else {
          console.error('Failed to fetch ADA price');
        }
      } catch (error) {
        console.error('Error fetching ADA price:', error);
      }
    };

    // Fetch ADA (Cardano) total supply with project_id
    const fetchAdaSupply = async () => {
      try {
        const response = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/network', {
          headers: {
            'project_id': 'mainnetS7iOmqEbA6VAEXxwXyKro3vebHjuU7zn'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setAdaTotalSupply(data.supply.total/1000000);
        } else {
          console.error('Failed to fetch ADA total supply');
        }
      } catch (error) {
        console.error('Error fetching ADA total supply:', error);
      }
    };

    fetchAdaPrice();
    fetchAdaSupply();
  }, []);

  useEffect(() => {
    if (adaTotalSupply !== null && worldPopulation !== null) {
      const ratio = (adaTotalSupply / worldPopulation).toFixed(9); // Adjust decimal places as needed
      setAdaToPopulationRatio(ratio);
    }
  }, [adaTotalSupply, worldPopulation]);

  return (
    <div>
      <Header/>
      <div style={{ backgroundColor: 'white', color: 'black', textAlign: 'center'}}>
        <div >
          <h2>
            <p style={textStyle}> Total ADA / World Population</p>
            <p style={numStyle}>{adaToPopulationRatio}</p> 
          </h2>
        </div>
        <hr />
        <div >
          <h2>
            <span style={numStyle}>{adaTotalSupply}</span> 
            <span style={textStyle}> Cardano (ADA)</span>
          </h2>
        </div>
        <div>
          <h2>
            <span style={numStyle}>{worldPopulation}</span> 
            <span style={textStyle}> People</span>
          </h2>
        </div>
        <hr />
        <div style={{ fontSize: '18px',fontFamily: 'Permanent Marker', padding: '20px' }}>
          Cardano brings a new standard in technology – open and inclusive – to challenge the old and activate a new age of sustainable, globally-distributed innovation.
        </div>
      </div>
    </div>
  );
};

export default App;
