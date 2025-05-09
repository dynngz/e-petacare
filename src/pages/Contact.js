import ContactForm from '../components/ContactForm';
import SocialLinks from '../components/common/SocialLinks';
import { Title } from "../components/common/TitleCp";

export default function ContactPage() {
  return (
    <div className="main-content">
      <div className="container">
        <Title 
          title="Contactar" 
        />
        
        <div className="contact-section">
          <div className="contact-info">
            <SocialLinks />
            
            <div className="contact-details">
              <h2>CONTACT</h2>
              <p>INFO@EXAMPLE.COM</p>
              <p>+49 123 456 78</p>
            </div>
          </div>
          
          <div className="contact-form-container">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};