import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import pawLogo from '../../assets/paw.png';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <div className="footer-logo">
                        <Link to="/" className="logo-link">PETACARE</Link>
                    </div>
                    <div className="footer-logo-image">
                        <img 
                            src={pawLogo}
                            alt="Petacare Logo"
                            onError={(e) => {
                                e.target.src = "/api/placeholder/100/100"; 
                            }}
                        />
                    </div>
                    <div className="footer-social">
                        <div className="footer-social-icon">
                            <a href="https://facebook.com">
                                <FontAwesomeIcon icon={faFacebook} size="2x" />
                            </a>
                        </div>
                        <div className="footer-social-icon">
                            <a href="https://instagram.com">
                                <FontAwesomeIcon icon={faInstagram} size="2x" />
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="footer-column">
                    <h4 className="footer-heading">HOME</h4>
                    <Link to="/stores" className="footer-link">STORES</Link>
                    <Link to="/contact" className="footer-link">CONTACT</Link>
                    <Link to="/blog" className="footer-link">ALBERGUE</Link>
                </div>
                
                <div className="footer-column">
                    <h4 className="footer-heading">SHOP</h4>
                    <Link to="/shop" className="footer-link">ALL PRODUCTS</Link>
                    <Link to="/faq" className="footer-link">FAQ</Link>
                </div>
                
                <div className="footer-column">
                    <h4 className="footer-heading">ADOPT</h4>
                    <Link to="/adopt" className="footer-link">ADOPT</Link>
                    <Link to="/lookbook" className="footer-link">LOOKBOOK</Link>
                </div>
            </div>
            
            <div className="footer-bottom">
                © 2025 Made by <a href="/">Dayana Gomez</a>
            </div>
        </footer>
    );
}