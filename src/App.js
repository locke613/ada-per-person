import React, { useEffect, useState } from 'react';
import Header from './Header';

const App = () => {
  const [worldPopulation, setWorldPopulation] = useState(null);
  const [adaPrice, setAdaPrice] = useState(null);
  const [adaTotalSupply, setAdaTotalSupply] = useState(null);
  const [adaToPopulationRatio, setAdaToPopulationRatio] = useState(null);
  const textStyle = {
    fontSize: '16px',
    lineHeight: '34px',
    fontFamily: 'Montserrat',
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

    fetchWorldPopulation();
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
      <div style={{ backgroundColor: 'white', color: 'black', textAlign: 'center', padding: '20px' }}>
        <div>
          <h2 style={{ textStyle }}>ADA to World Population Ratio</h2>
          {adaToPopulationRatio !== null ? <p>{adaToPopulationRatio} ADA per person</p> : <p>Loading...</p>}
        </div>
        <div>
          <h2 style={{ textStyle }}>Cardano (ADA) Price (USD)</h2>
          {adaPrice !== null ? <p>${adaPrice}</p> : <p>Loading...</p>}
        </div>
        <div >
          <h2 style={{ textStyle }}>Cardano (ADA) Total Supply</h2>
          {adaTotalSupply !== null ? <p>{adaTotalSupply} ADA</p> : <p>Loading...</p>}
        </div>
        <div>
          <h2 style={{ textStyle }}>World Population</h2>
          {worldPopulation !== null ? <p>{worldPopulation}</p> : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
