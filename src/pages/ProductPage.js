import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, getRelatedProducts } from '../services/ProductService';
import { ProductCard } from '../components/common/ProductCard';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productData = await getProductBySlug(slug);
        setProduct(productData);
        
        if (productData && productData.category) {
          const related = await getRelatedProducts(productData.category._id, productData._id);
          setRelatedProducts(related);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load product');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    //implemetar funcionalidad del carro
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error || !product) {
    return <div className="error">{error || 'Product not found'}</div>;
  }

  return (
    <div className="product-page">
      <div className="product-detail">
        <div className="product-image-section">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="product-detail-image" 
            />
          ) : (
            <div className="image-detail-placeholder">Imagen</div>
          )}
        </div>
        
        <div className="product-info-section">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)} USD</p>
          
          <div className="product-description">
            <p>{product.description}</p>
          </div>
          
          <div className="quantity-control">
            <button 
              className="quantity-btn" 
              onClick={handleQuantityDecrement}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input 
              type="text" 
              className="quantity-input" 
              value={quantity} 
              readOnly 
            />
            <button 
              className="quantity-btn" 
              onClick={handleQuantityIncrement}
            >
              +
            </button>
          </div>
          
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            GET PRODUCT
          </button>
          
          <div className="product-meta">
            <p className="product-category">
              Category: <Link to={`/shop/${product.category.slug}`}>{product.category.name}</Link>
            </p>
          </div>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2 className="related-title">Related</h2>
          <div className="related-grid">
            {relatedProducts.map(relProduct => (
              <div className="related-item" key={relProduct._id}>
                <ProductCard product={relProduct} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;