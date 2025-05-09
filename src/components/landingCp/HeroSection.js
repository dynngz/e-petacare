import puppyHero from '../../assets/puppy-hero.jpg';
import { Link } from 'react-router-dom';

export default function HeroSection(){
  return (
    <div className="hero-container">
      <img className="background" src={puppyHero} alt="hero-img" />
      <div className="hero-content">
        <div className="hero-text">
        <h2>
          <span className="color-one">Adopta un</span><br />
          <span className="color-one">amigo,</span> <span className="color-two">cambia</span><br />
          <span className="color-two">una vida</span><br />
        </h2>
          <p>
            En PetACare, creemos que cada perro merece un
            hogar lleno de cariño. Compra productos para tu
            mascota y contribuye a rescatar a más perros.
            Tu compra salva vidas.   
          </p>
          <Link to="/donation" className="hero-button">
            DESCUBRE COMO PUEDES AYUDAR
          </Link>
        </div>
      </div>
    </div>
  );
};
