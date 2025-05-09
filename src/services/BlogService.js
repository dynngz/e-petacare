import { fetchApi } from './api';  

export const getLatestArticles = async () => {
  try {
    const response = await fetchApi('/blog/latest?limit=2');
    return response.data?.articles || [];
  } catch (error) {
    throw new Error('Error al obtener los artículos del blog');
  }
};
