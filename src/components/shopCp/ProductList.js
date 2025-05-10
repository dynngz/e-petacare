import React from 'react';
import { ProductCard } from '../common/ProductCard';

export const ProductList = ({ products, categoryName, loading, error }) => {
  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        {categoryName 
          ? `No hay productos disponibles en la categoría ${categoryName}.` 
          : 'No hay productos disponibles.'}
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-grid">
        {products.map(product => (
          <div className="product-grid-item" key={product._id || product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};