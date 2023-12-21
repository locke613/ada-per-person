import React from 'react';
import { Link } from 'react-router-dom';
import CardanoLogo from './cardano.png'; 

const Header = () => {
  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px', textAlign: 'center' }}>
        <img src={CardanoLogo} alt="Cardano Logo" style={{ width: '50px', marginRight: '10px' }} />
    </div>
  );
};

export default Header;
