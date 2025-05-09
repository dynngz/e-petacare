import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductBySlug, getRelatedProducts } from '../../services/ProductService';
import { ProductCard } from '../common/ProductCard';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const productData = await getProductBySlug(slug);
        if (!productData) {
          throw new Error('Product not found');
        }
        
        setProduct(productData);
        
        if (productData && productData.category && productData.category._id) {
          try {
            const related = await getRelatedProducts(productData.category._id, productData._id);
            setRelatedProducts(related);
          } catch (relatedErr) {
            console.error('Error fetching related products:', relatedErr);
            //set error solo en esa parte no en todo
            setRelatedProducts([]);
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to load product:', err);
        setError('Failed to load product details');
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    } else {
      setError('Invalid product URL');
      setLoading(false);
    }
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
    //implementar funcionalidad del carro
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <div className="error">{error || 'Product not found'}</div>
        <button className="back-btn" onClick={() => navigate('/shop')}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-detail">
        <div className="product-image-section">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-detail-image" 
            />
          ) : (
            <div className="image-detail-placeholder">No Image Available</div>
          )}
        </div>
        
        <div className="product-info-section">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">
            {product.new_price ? (
              <>
                <span className="original-price">${product.price.toFixed(2)}</span>
                <span className="sale-price">${product.new_price.toFixed(2)}</span>
              </>
            ) : (
              <span>${product.price.toFixed(2)}</span>
            )} USD
          </p>
          
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
              disabled={product.inStock <= quantity}
            >
              +
            </button>
          </div>
          
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
            disabled={product.inStock < 1}
          >
            {product.inStock > 0 ? 'ADD TO CART' : 'OUT OF STOCK'}
          </button>
          
          {product.category && (
            <div className="product-meta">
              <p className="product-category">
                Category: <Link to={`/shop/${product.category.slug}`}>{product.category.name}</Link>
              </p>
            </div>
          )}
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2 className="related-title">Related Products</h2>
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