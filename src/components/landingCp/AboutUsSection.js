import { Link } from 'react-router-dom';
export default function AboutUs () {
  return (
    <div className="about-container">
      <div className="about-header">
        <h2>Sobre nosotros</h2>
      </div>
      <div className="about-content">
        <div className="about-image">
          <img src="https://i.pinimg.com/originals/da/ba/f8/dabaf8391677b2148060f5c09cd3b69b.png" alt="Dog waving" />
        </div>
        <div className="about-text">
          <p>
          En PetACare somos una organización sin fines de lucro con una misión clara: darles una segunda 
          oportunidad a los perros rescatados. A través de nuestra tienda online, vendemos productos para 
          mascotas, y con cada compra, ayudas directamente a financiar el rescate, la atención y la adopción 
          de estos perros que tanto lo necesitan.
          </p>
          <p>
          Además, aceptamos donaciones para seguir rescatando y cuidando a más perros que buscan un hogar. 
          Cada gesto, ya sea comprando un producto o haciendo una donación, transforma vidas. 
          ¡Tu apoyo hace la diferencia! Únete a nuestra causa y juntos, podemos cambiar el destino de muchos perros.
          </p>
          <Link to="/shop" className="shop-button">
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
};
