import { fetchApi } from './api';

export const getCategories = async () => {
  const response = await fetchApi('/categories');
  return response.data || [];
};

export const getAllProducts = async () => {
  const response = await fetchApi('/products');
  return response.data || [];
};

export const getProductsByCategory = async (categorySlug) => {
  if (!categorySlug) {
    const response = await fetchApi('/products');
    return response.data || [];
  }
  
  try {
    const response = await fetchApi(`/products/category/slug/${categorySlug}`);
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    throw error;
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const response = await fetchApi(`/products/slug/${slug}`);
    return response.data || null;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    throw error;
  }
};

export const getRelatedProducts = async (categoryId, productId, limit = 3) => {
  try {
    const categoryResponse = await fetchApi(`/categories/${categoryId}`);
    const categorySlug = categoryResponse.data?.slug;
    
    if (categorySlug) {
      const response = await fetchApi(`/products/category/slug/${categorySlug}`);
      return (response.data || [])
        .filter(product => product._id !== productId)
        .slice(0, limit);
    } else {
      const response = await fetchApi(`/products/category/${categoryId}`);
      return (response.data || [])
        .filter(product => product._id !== productId)
        .slice(0, limit);
    }
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
};

export const getFeaturedProducts = async () => {
  const response = await fetchApi('/products/featured-products');
  return response.data || [];
};