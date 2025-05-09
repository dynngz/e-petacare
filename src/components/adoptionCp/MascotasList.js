import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMascotas } from '../../services/MascotaService'; 

const MascotasList = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const data = await getMascotas(); 
        setMascotas(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las mascotas. Por favor, intente de nuevo más tarde.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchMascotas();
  }, []);

  if (loading) return <div className="loading">Cargando mascotas...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="mascotas-list-container">
      <div className="mascotas-grid">
        {mascotas.map(mascota => (
          <Link to={`/adopt/${mascota.slug}`} key={mascota._id} className="mascota-card">
            <div className="mascota-image-container">
              <img src={mascota.imagen} alt={mascota.nombre} className="mascota-image" />
            </div>
            <div className="mascota-name">{mascota.nombre}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MascotasList;
