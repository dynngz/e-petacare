import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryNav } from '../components/shopCp/CategoryNav';
import { ProductList } from '../components/shopCp/ProductList';
import { getAllProducts, getProductsByCategory } from '../services/ProductService';
import { Title } from '../components/common/TitleCp';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const { categorySlug } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let productsData = [];
        let category = null;
        
        if (categorySlug) {
          const response = await getProductsByCategory(categorySlug);
          productsData = response || [];
          
          // info de categoría
          if (response && response.category) {
            category = response.category;
            setCategoryName(category.name);
          }
        } else {
          productsData = await getAllProducts();
          setCategoryName('');
        }
        
        console.log("Productos cargados:", productsData);
        setProducts(Array.isArray(productsData) ? productsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('No se pudieron cargar los productos. Por favor, intente de nuevo más tarde.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  return (
    <div className="shop-page">
      <Title title="Nuestros productos" />
      
      <CategoryNav activeCategory={categorySlug} />
      
      {categoryName && (
        <h2 className="category-title">{categoryName}</h2>
      )}
      
      <ProductList 
        products={products} 
        categoryName={categoryName}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default ShopPage;