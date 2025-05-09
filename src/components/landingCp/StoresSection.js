import React from 'react';
import { Link } from 'react-router-dom';

export default function OurStores() {
    const stores = [
        {
            id: 1,
            name: "PIURA",
            image: "https://assets3.thrillist.com/v1/image/2739617/1584x892/scale;webp=auto;jpeg_quality=60.jpg", 
            link: "/stores"
    // address, city, phone
        },
        {
            id: 2,
            name: "LIMA",
            image: "https://i.pinimg.com/originals/5e/f2/dc/5ef2dce4666dd1456227c0ad1841668f.jpg", 
            link: "/stores"
        },
        {
            id: 3,
            name: "TUMBES",
            image: "https://imgs.elpais.com.uy/dims4/default/3b9e28e/2147483647/strip/true/crop/2000x1375+0+63/resize/2880x1980!/format/webp/quality/90/?url=https%3A%2F%2Fel-pais-uruguay-production-web.s3.us-east-1.amazonaws.com%2Fbrightspot%2Ffc%2Fbc%2Fc5b04984433a9463c54a6b7d01bb%2Falbergue.jpg", 
            link: "/stores"
        }
    ];

    return (
        <section className="stores-section">
            <div className="stores-header">
                <h2 className="stores-title">Nuestros albergues</h2>
                <Link to="/stores" className="stores-link">
                    SEE ALL <span className="stores-link-arrow">→</span>
                </Link>
            </div>
            <div className="stores-grid">
                {stores.map(store => (
                    <div key={store.id} className="store-item">
                        <Link to={store.link}>
                            <div className="store-image-container">
                                <img 
                                    src={store.image} 
                                    alt={store.name}
                                    className="store-image"
                                    onError={(e) => {
                                        e.target.src = "/api/placeholder/400/400"; 
                                    }}
                                />
                                <div className="store-name">{store.name}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}