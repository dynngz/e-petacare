import FAQItem from '../components/FaqItem';
import { Title } from '../components/common/TitleCp';

export default function FAQPage (){
  const faqItems = [
    {
      question: "How can I change or cancel my order?",
      answer: "To change or cancel your order, please contact our customer service team at info@example.com or call us at +49 123 456 78 within 24 hours of placing your order. Please have your order number ready for faster assistance."
    },
    {
      question: "Do I have to order online?",
      answer: "No, you don't have to order online. You can also visit our local stores or call our customer service to place an order. However, our complete product range is available online for your convenience."
    },
    {
      question: "What is the return policy?",
      answer: "We offer a 30-day return policy for all unused items in their original packaging. Custom or made-to-order items cannot be returned unless defective. Please contact our customer service team to initiate a return."
    }
  ];

  return (
    <div className="main-content">
      <div className="container">
      <Title title="Alguna pregunta?" />
        
        <div className="faq-section">
          {faqItems.map((item, index) => (
            <FAQItem 
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
        
        <div className="help-section">
          <div className="help-column">
            <h2 className="help-title">More Help?</h2>
          </div>
          
          <div className="help-column">
            <h3>Local Stores</h3>
            <p>Proin fermentum leo vel orci porta non pulvinar. Diam phasellus vestibulum lorem sed risus ultricies.</p>
            <a href="/stores" className="help-link">FIND A STORE</a>
          </div>
          
          <div className="help-column">
            <h3>Contact Us</h3>
            <p>Proin fermentum leo vel orci porta non pulvinar. Diam phasellus vestibulum lorem sed risus ultricies.</p>
            <a href="/contact" className="help-link">CONTACT</a>
          </div>
        </div>
      </div>
    </div>
  );
};
