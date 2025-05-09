import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../../services/ProductService';

export const CategoryNav = ({ activeCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories || []);
        setLoading(false);
      } catch (err) {
        console.error("Error loading categories:", err);
        setError("Failed to load categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="category-nav-loading">Loading categories...</div>;
  }

  if (error) {
    return <div className="category-nav-error">{error}</div>;
  }

  return (
    <div className="category-nav">
      <nav className="category-menu">
        <NavLink
          to="/shop"
          className={({ isActive }) => 
            isActive && !activeCategory ? "category-link active" : "category-link"
          }
          end
        >
          ALL
        </NavLink>
        
        {categories.map(category => (
          <NavLink
            key={category._id}
            to={`/shop/${category.slug}`}
            className={({ isActive }) => 
              isActive || category.slug === activeCategory 
                ? "category-link active" 
                : "category-link"
            }
          >
            {category.name.toUpperCase()}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};