import React from 'react';

export default function BlogPostCard ({ image, title, excerpt, date, category }) {
  return (
    <div className="blog-post-card">
      <div className="blog-image">
        <img src={image} alt={title} />
      </div>
      <div className="blog-meta">
        <span className="blog-category">{category}</span>
        <span className="meta-divider">—</span>
        <span className="blog-date">{date}</span>
      </div>
      <h2 className="blog-title">{title}</h2>
      <p className="blog-excerpt">{excerpt}</p>
    </div>
  );
};