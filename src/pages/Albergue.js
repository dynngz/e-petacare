import PageHeader from '../components/blogCt/PageHeader';
import BlogPostCard from '../components/blogCt/BlogPostCard';

export default function Albergue ()  {
  const blogPosts = [
    {
      id: 1,
      title: "Interior Design Trends",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum dui faucibus in ornare quam viverra orci sagittis.",
      image: "https://i.pinimg.com/736x/5f/4a/1e/5f4a1e492a5640ade4ffc429efed9944.jpg",
      date: "JULY 21, 2022",
      category: "TRENDS"
    },
    {
      id: 2,
      title: "Minimal Interior",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum dui faucibus in ornare quam viverra orci sagittis.",
      image: "https://i.pinimg.com/736x/5f/4a/1e/5f4a1e492a5640ade4ffc429efed9944.jpg",
      date: "JULY 21, 2022",
      category: "MINIMAL"
    }
  ];

  return (
    <div className="main-content">
      <div className="container">
        <PageHeader 
          title="Interior Design Trends" 
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum dui faucibus in ornare quam viverra orci sagittis."
          date="JULY 21, 2022"
          category="TRENDS"
        />
        
        <div className="blog-content">
          {/* <img src="/images/interior-design-trends.jpg" alt="Interior Design Trends" className="blog-header-image" /> */}
          
          <div className="blog-grid">
            {blogPosts.map(post => (
              <BlogPostCard 
                key={post.id}
                image={post.image}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};