import React, { useEffect, useState } from 'react';
import { getFeaturedProducts } from '../../services/ProductService';

const FeaturedSection = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const products = await getFeaturedProducts(); 
                setFeaturedProducts(products);
            } catch (error) {
                console.error('Error fetching featured products:', error);
                setError('Failed to load products');
            }
        };

        fetchFeaturedProducts();
    }, []);

    if (error) return <div className="error-message">{error}</div>;

    return (
        <section className="featured-section">
            <h2 className="featured-title">Productos Destacados</h2>
            <div className="featured-products">
                {featuredProducts.map(product => (
                    <div key={product.id} className="featured-product">
                        <div className="product-image-container">
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="product-image"
                                onError={(e) => {
                                    console.log('Image failed to load:', product.image);
                                    e.target.src = "/placeholder-image.jpg"; 
                                }}
                            />
                        </div>
                        <h3 className="product-title">{product.name}</h3>
                        <div className="product-price-container">
                            <span className="product-price">$ {product.price.toFixed(2)} USD</span>
                            {product.old_price && (
                                <span className="product-original-price">$ {product.old_price.toFixed(2)} USD</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedSection;
