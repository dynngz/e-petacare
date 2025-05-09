import React from 'react';

const PageHeader = ({ title, subtitle, date, category }) => {
  return (
    <div className="page-header">
      {category && date && (
        <div className="page-meta">
          <span className="page-category">{category}</span>
          <span className="meta-divider">—</span>
          <span className="page-date">{date}</span>
        </div>
      )}
      <h1 className="page-title">{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </div>
  );
};

export default PageHeader;
