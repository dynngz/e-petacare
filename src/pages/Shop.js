import React, { useState, useEffect } from 'react';
import { getCategories, getProductsByCategory } from '../services/ProductService';
import { useParams } from 'react-router-dom';
import { Title } from '../components/common/TitleCp';
import { CategoryNav } from '../components/shopCp/CategoryNav';
import { ProductList } from '../components/shopCp/ProductList';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categorySlug } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load categories');
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let productsData;
        if (categorySlug) {
          productsData = await getProductsByCategory(categorySlug);
        } else {
          //get todos los productos
          productsData = await getProductsByCategory();
        }
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  const activeCategory = categorySlug
    ? categories.find(cat => cat.slug === categorySlug)
    : null;

  const title = activeCategory ? activeCategory.name : 'Shop';

  return (
    <div className="shop-container">
      <Title title={title} />
      <CategoryNav categories={categories} activeCategory={categorySlug} />
      
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default Shop;