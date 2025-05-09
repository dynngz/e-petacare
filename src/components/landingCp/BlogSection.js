import React, { useEffect, useState } from 'react';
import { getLatestArticles } from '../../services/BlogService';

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  useEffect(() => {
    const fetchLatestArticles = async () => {
      setIsLoading(true);
      try {
        const articles = await getLatestArticles(); 
        setBlogPosts(articles);
        console.log('Latest articles loaded:', articles);
      } catch (error) {
        console.error('Error fetching latest articles:', error);
        setError('Failed to load articles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestArticles();
  }, []);

  if (isLoading) return <div className="blog-section">Loading latest articles...</div>;
  if (error) return <div className="blog-section">Error: {error}</div>;
  if (blogPosts.length === 0) return <div className="blog-section">No articles available at the moment.</div>;

  return (
    <div className="blog-section">
      <div className="blog-header">
        <div className="color-line"></div>
        <h2>Últimos artículos de<br />nuestro blog</h2>
      </div>
      
      <div className="blog-posts">
        {blogPosts.map(post => {
          const formattedDate = post?.date ? dateFormatter.format(new Date(post.date)) : 'Unknown date';

          return (
            <div className="blog-post" key={post.id}>
              <div className="blog-image">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title}
                    onError={(e) => {
                      console.log('Image failed to load:', post.image);
                      e.target.src = "/placeholder-image.jpg"; 
                    }}
                  />
                ) : (
                  <img src="/api/placeholder/400/300" alt="Placeholder" />
                )}
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="category">{post.category}</span>
                  <span className="date"> {formattedDate}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 120)}...</p>
                <a href={`/blog/${post.slug || post.id}`} className="read-more">
                  READ MORE <span className="arrow">→</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
