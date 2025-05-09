import React from 'react';

export const HeroSection = ({ title }) => {
  return (
    <div className="hero-section">
      <h1>{title}</h1>
    </div>
  );
};

export const AdoptionDescription = () => {
  return (
    <div className="adoption-description">
      <h2>Todos estos peluditos están ansiosos de poder tener una familia que los ame y haga sentir especial en este mundo.</h2>
      <p>Están sanos, esterilizados (los mayores a 6 meses), vacunados y desparasitados. Totalmente listos para empezar su vida con una mami o papi humano! Conócelos más en esta sección</p>
    </div>
  );
};

export const CallToAction = () => {
  return (
    <div className="call-to-action">
      <p>Ayúdanos a seguir ayudando haciendo una</p>
      
      <a href="/donation" className="see-more">
      <button className="cta-button">Donacion </button>
      </a>
        
        
    </div>
  );
};
