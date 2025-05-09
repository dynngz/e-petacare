import React from 'react';

export const DonationDescription = () => {
  return (
    <div className="donation-description">
      <h2>Una linda iniciativa que consiste en lograr que cada vez seamos más humanos ayudando y dándoles una vida mejor a todos aquellos que no tienen voz.</h2>
      <p>Conoce nuestros Packs por los peluditos y únete para ayudarnos a lograr un mundo mejor para ellos!</p>
    </div>
  );
};

export const DonationPack = ({ packNumber, price, description, bulletinFrequency, additionalPerks, image }) => {
  return (
    <div className={`donation-pack ${packNumber === 30 ? 'reverse-layout' : ''}`}>
      <div className="pack-image">
        <img src={image} alt={`Pack ${packNumber}`} />
      </div>
      <div className="pack-details">
        <h3 className={`pack-title ${packNumber === 30 ? 'pink-title' : 'teal-title'}`}>Pack {packNumber} por los peluditos</h3>
        <p>{description}</p>
        <p>Cada {bulletinFrequency} meses te mandaremos un boletín contándote las actividades mensuales realizadas.{additionalPerks ? ` ${additionalPerks}` : ''}</p>
        <button className={`subscription-button ${packNumber === 30 ? 'pink-button' : 'teal-button'}`}>
          S/. {price}.00 MENSUALES
        </button>
      </div>
    </div>
  );
};