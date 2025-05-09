import React from 'react';
import { ProductCard } from '../common/ProductCard';

export const ProductList = ({ products, categoryName }) => {
  if (products.length === 0) {
    return (
      <div className="no-products">
        {categoryName 
          ? `No products found in the ${categoryName} category.` 
          : 'No products found.'}
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-grid">
        {products.map(product => (
          <div className="product-grid-item" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};