import React from 'react';
import DonationBarCode from './Donation.png';

const BarcodePage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={DonationBarCode} alt="Donation Barcode" width="300px" />
    </div>
  );
};

export default BarcodePage;