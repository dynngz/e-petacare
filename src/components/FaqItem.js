import React, { useState } from 'react';

export default function FaqItem ({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <div 
        className="faq-question" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3>{question}</h3>
        <button className="expand-button">
          {isOpen ? '−' : '+'}
        </button>
      </div>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};
