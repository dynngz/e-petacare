import React, { useState, useEffect, useRef } from 'react';

const LookbookPerfectGrid = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const lookbookRef = useRef(null);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);

  const lookbookItems = [
    { id: 1, image: 'https://i.pinimg.com/736x/fb/f4/6b/fbf46bf0085d03edfe4781ba83bc9d78.jpg', title: 'Blue Chair', description: 'Modern blue chair with wooden legs' },
    { id: 2, image: 'https://i.pinimg.com/736x/54/ee/9b/54ee9be9c0e0d8fb34dfd20bc8f182e3.jpg', title: 'Beige Chair', description: 'Comfortable beige chair for your living room' },
    { id: 3, image: 'https://i.pinimg.com/736x/54/ee/9b/54ee9be9c0e0d8fb34dfd20bc8f182e3.jpg', title: 'Black Chair', description: 'Elegant black chair with minimalist design' },
    
    { id: 4, image: 'https://i.pinimg.com/736x/fb/f4/6b/fbf46bf0085d03edfe4781ba83bc9d78.jpg', title: 'Pendant Lights', description: 'Set of copper pendant lights for ambient lighting' },
    { id: 5, image: 'https://i.pinimg.com/736x/54/ee/9b/54ee9be9c0e0d8fb34dfd20bc8f182e3.jpg', title: 'Modern Stool', description: 'Contemporary wooden stool design' },
    { id: 6, image: 'https://i.pinimg.com/736x/54/ee/9b/54ee9be9c0e0d8fb34dfd20bc8f182e3.jpg', title: 'Wooden Side Table', description: 'Minimalist wooden side table' },
    
    { id: 7, image: 'https://i.pinimg.com/736x/54/ee/9b/54ee9be9c0e0d8fb34dfd20bc8f182e3.jpg', title: 'Rattan Nightstand', description: 'Rustic rattan nightstand with storage' },
    { id: 8, image: 'https://i.pinimg.com/736x/54/ee/9b/54ee9be9c0e0d8fb34dfd20bc8f182e3.jpg', title: 'Chair Set', description: 'Modern chairs in mustard and cream' },
    { id: 9, image: 'https://i.pinimg.com/736x/fb/f4/6b/fbf46bf0085d03edfe4781ba83bc9d78.jpg', title: 'Writing Desk', description: 'Minimalist desk for your home office' },
    
    { id: 10, image: 'https://i.pinimg.com/736x/54/ee/9b/54ee9be9c0e0d8fb34dfd20bc8f182e3.jpg', title: 'Floor Mirror', description: 'Full-length wooden mirror' },
    { id: 11, image: 'https://i.pinimg.com/736x/54/ee/9b/54ee9be9c0e0d8fb34dfd20bc8f182e3.jpg', title: 'Reading Corner', description: 'Cozy reading nook with natural light' },
    { id: 12, image: 'https://i.pinimg.com/736x/54/ee/9b/54ee9be9c0e0d8fb34dfd20bc8f182e3.jpg', title: 'Kitchen Space', description: 'Modern kitchen with dark finishes' },
    
    { id: 13, image: 'https://i.pinimg.com/736x/fb/f4/6b/fbf46bf0085d03edfe4781ba83bc9d78.jpg', title: 'Living Room', description: 'Contemporary living room setup' },
    { id: 14, image: 'https://i.pinimg.com/736x/54/ee/9b/54ee9be9c0e0d8fb34dfd20bc8f182e3.jpg', title: 'Table Lamp', description: 'Warm ambient lighting for your space' },
    { id: 15, image: 'https://i.pinimg.com/736x/54/ee/9b/54ee9be9c0e0d8fb34dfd20bc8f182e3.jpg', title: 'Bedroom Setup', description: 'Minimalist bedroom with natural light' },
  ];

  const handleMouseMove = (e) => {
    if (!lookbookRef.current) return;
    
    const { clientX, clientY } = e;
    const { width, height, left, top } = lookbookRef.current.getBoundingClientRect();
    //containt center
    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;
    
    lastMousePosition.current = { x, y };
  };

  useEffect(() => {
    const animateMove = () => {
      setMousePosition(prev => ({
        x: prev.x + (lastMousePosition.current.x - prev.x) * 0.06,
        y: prev.y + (lastMousePosition.current.y - prev.y) * 0.06
      }));
      
      animationFrameId.current = requestAnimationFrame(animateMove);
    };
    
    animationFrameId.current = requestAnimationFrame(animateMove);
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  useEffect(() => {
    const preventScroll = (e) => {
      if (lookbookRef.current && lookbookRef.current.contains(e.target)) {
        e.preventDefault();
        return false;
      }
    };

    lookbookRef.current?.addEventListener('wheel', preventScroll, { passive: false });
    
    return () => {
      lookbookRef.current?.removeEventListener('wheel', preventScroll);
    };
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const closeModal = () => {
    setActiveItem(null);
  };

  const renderColumn = (startIndex, count) => {
    const columnItems = lookbookItems.slice(startIndex, startIndex + count);
    return (
      <div className="lookbook-column">
        {columnItems.map(item => (
          <div 
            key={item.id} 
            className="lookbook-item"
            onClick={() => handleItemClick(item)}
          >
            <div className="image-container">
              <img src={item.image} alt={item.title} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="lookbook-container" onMouseMove={handleMouseMove} ref={lookbookRef}>
      
      <div 
        className="lookbook-grid"
        style={{ 
          transform: `translate(${mousePosition.x * -60}px, ${mousePosition.y * -60}px)`
        }}
      >
        {renderColumn(0, 3)}
        
        {renderColumn(3, 3)}
        
        {renderColumn(6, 3)}
        
        {renderColumn(9, 3)}
        
        {renderColumn(12, 3)}
      </div>

      {activeItem && (
        <div className="lookbook-modal">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>CLOSE</button>
            <h2 className="modal-title">{activeItem.title}</h2>
            <div className="modal-image-container">
              <img src={activeItem.image} alt={activeItem.title} className="modal-image" />
            </div>
            <p className="modal-description">{activeItem.description}</p>
            <button className="get-product-button">GET PRODUCT</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LookbookPerfectGrid;