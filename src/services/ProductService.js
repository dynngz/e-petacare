import { fetchApi } from './api';

export const getFeaturedProducts = async () => {
  try {
    const response = await fetchApi('/products');
    const allProducts = response.data?.products || response.data;

    //tomar los primeros 3 productos
    const featuredProducts = allProducts.slice(0, 3);
    return featuredProducts;
  } catch (error) {
    throw new Error('Error al obtener los productos destacados');
  }
};

export const getCategories = async () => {
  const response = await fetchApi('/categories');
  return response.data?.data || [];
};

export const getAllProducts = async () => {
  const response = await fetchApi('/products');
  return response.data;
};

export const getProductsByCategory = async (categorySlug) => {
  if (!categorySlug) {
    const response = await fetchApi('/products');
    return response.data;
  }
  
  const response = await fetchApi(`/products/category/slug/${categorySlug}`);
  return response.data;
};

export const getProductBySlug = async (slug) => {
  const response = await fetchApi(`/products/slug/${slug}`);
  return response.data;
};

export const getRelatedProducts = async (categoryId, productId, limit = 3) => {
  try {
    const categoryResponse = await fetchApi(`/categories/${categoryId}`);
    const categorySlug = categoryResponse.data?.slug;
    
    if (categorySlug) {
      const response = await fetchApi(`/products/category/slug/${categorySlug}`);
      return response.data
        .filter(product => product._id !== productId)
        .slice(0, limit);
    } else {
      const response = await fetchApi(`/products/category/${categoryId}`);
      return response.data
        .filter(product => product._id !== productId)
        .slice(0, limit);
    }
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
};