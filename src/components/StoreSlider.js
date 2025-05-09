import React, { useEffect, useRef } from 'react';

const HorizontalScrollSection = ({ children }) => {
  const scrollSectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollSectionRef.current;
    const container = containerRef.current;
    
    if (!scrollContainer || !container) return;
    
    const slides = Array.from(scrollContainer.children);
    const slideWidth = window.innerWidth * 0.75; 
    
    slides.forEach(slide => {
      slide.style.width = `${slideWidth}px`;
      slide.style.flex = `0 0 ${slideWidth}px`;
    });
    
    const totalWidth = slideWidth * slides.length;
    
    const containerHeight = totalWidth - window.innerWidth + window.innerHeight;
    container.style.height = `${containerHeight}px`;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = container.offsetHeight - window.innerHeight;
      const scrollRatio = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      const maxTranslate = totalWidth - window.innerWidth;
      const translateX = maxTranslate * scrollRatio;
      
      scrollContainer.style.transform = `translate3d(-${translateX}px, 0, 0)`;
    };
    
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="horizontal-scroll-container" ref={containerRef}>
      <div className="horizontal-scroll-element">
        <div className="horizontal-scroll-section" ref={scrollSectionRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollSection;