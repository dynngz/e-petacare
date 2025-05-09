import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMascotaBySlug } from '../../services/MascotaService';  

const MascotasDetail = () => {
  const { slug } = useParams();
  const [mascota, setMascota] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const data = await getMascotaBySlug(slug);  
        setMascota(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar la información de la mascota. Por favor, intente de nuevo más tarde.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchMascota();
  }, [slug]);

  if (loading) return <div className="loading">Cargando información de la mascota...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!mascota) return <div className="not-found">Mascota no encontrada</div>;

  return (
    <div className="mascota-detail-container">
      <div className="mascota-detail-content">
        <div className="mascota-detail-image-container">
          <img src={mascota.imagen} alt={mascota.nombre} className="mascota-detail-image" />
        </div>

        <div className="mascota-detail-info">
          <h1 className="mascota-detail-name">{mascota.nombre}</h1>
          <div className="mascota-detail-attributes">
            {mascota.genero}, {mascota.edad} años, {mascota.tamaño}, {mascota.peso} kilos, 
            {mascota.personalidad.map((trait, index) => (
              <span key={index}>{index === 0 ? '' : ','} {trait}</span>
            ))}
            {mascota.salud && <span>. {mascota.salud}</span>}
          </div>
          
          <div className="mascota-detail-story">
            <p>{mascota.historia}</p>
          </div>
          
          <button className="adopt-button">ADOPTALO</button>
        </div>
      </div>
    </div>
  );
};

export default MascotasDetail;
