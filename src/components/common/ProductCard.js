import React from 'react';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.slug}`} className="product-link">
        <div className="product-image-container">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image" 
            />
          ) : (
            <div className="image-placeholder">Imagen</div>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          {/* <p className="product-price">${product.price.toFixed(2)} USD</p> */}
        </div>
      </Link>
    </div>
  );
};

