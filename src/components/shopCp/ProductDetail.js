import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductBySlug, getRelatedProducts } from '../../services/ProductService';
import { ProductCard } from '../common/ProductCard/ProductCard';

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
        console.log("Datos del producto:", productData);
        
        if (!productData) {
          throw new Error('Producto no encontrado');
        }
        
        setProduct(productData);
        
        if (productData && productData.category && productData.category._id) {
          try {
            const related = await getRelatedProducts(productData.category._id, productData._id);
            console.log("Productos relacionados:", related);
            setRelatedProducts(related || []);
          } catch (relatedErr) {
            console.error('Error fetching related products:', relatedErr);
            setRelatedProducts([]);
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to load product:', err);
        setError('No se pudo cargar la información del producto');
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    } else {
      setError('URL del producto inválida');
      setLoading(false);
    }
  }, [slug]);

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityIncrement = () => {
    if (product && product.inStock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    // Implementar funcionalidad del carro
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  if (loading) {
    return <div className="loading">Cargando detalles del producto...</div>;
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <div className="error">{error || 'Producto no encontrado'}</div>
        <button className="back-btn" onClick={() => navigate('/shop')}>
          Volver a la tienda
        </button>
      </div>
    );
  }

  const isInStock = product.inStock > 0;

  return (
    <div className="product-page">
      <div className="product-detail">
        <div className="product-image-section">
          <img 
            src={getImageUrl(product.image, 'producto')} 
            alt={product.name} 
            className="product-detail-image" 
            onError={(e) => handleImageError(e, 'producto')}
          />
          {!isInStock && (
            <div className="out-of-stock-badge">Agotado</div>
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
              disabled={quantity <= 1 || !isInStock}
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
              disabled={!isInStock || product.inStock <= quantity}
            >
              +
            </button>
          </div>
          
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
            disabled={!isInStock}
          >
            {isInStock ? 'AÑADIR AL CARRITO' : 'AGOTADO'}
          </button>
          
          {product.category && (
            <div className="product-meta">
              <p className="product-category">
                Categoría: <Link to={`/shop/${product.category.slug}`}>{product.category.name}</Link>
              </p>
            </div>
          )}
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2 className="related-title">Productos Relacionados</h2>
          <div className="related-grid">
            {relatedProducts.map(relProduct => (
              <div className="related-item" key={relProduct._id || relProduct.id}>
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