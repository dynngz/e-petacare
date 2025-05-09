import { fetchApi } from './api';

export const getMascotas = async () => {
    try {
      const response = await fetchApi('/adopt');
      return response.data?.data || [];
    } catch (error) {
      throw new Error('Error al obtener las mascotas');
    }
  };
  
  export const getMascotaBySlug = async (slug) => {
    try {
      const response = await fetchApi(`/adopt/${slug}`);
      return response.data?.data || null;
    } catch (error) {
      throw new Error('Error al obtener la mascota');
    }
  };
  
  