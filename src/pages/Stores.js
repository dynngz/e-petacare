import React, { useEffect } from 'react';
import HorizontalScrollSection from "../components/StoreSlider"

export default function StoreLocations() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar-container');
    
    if (navbar) {
      navbar.style.position = 'fixed';
      navbar.style.width = '100%';
      navbar.style.zIndex = '100';
      navbar.style.top = '0';
    }
    
    return () => {
      if (navbar) {
        navbar.style.position = '';
        navbar.style.width = '';
        navbar.style.zIndex = '';
        navbar.style.top = '';
      }
    };
  }, []);

  const locations = [
    {
      name: "The Paw Lodge",
      city: "Piura",
      store: "Solve Store",
      address: "22765 Hamburg",
      directionsUrl: "#",
      image: "https://s3-media0.fl.yelpcdn.com/bphoto/6CgnAEIphoB4JcoEqU2FEA/l.jpg"
    },
    {
      name: "Tailstead",
      city: "Lima",
      store: "Solve Store",
      address: "10001 New York",
      directionsUrl: "#",
      image: "https://static1.s123-cdn-static-a.com/uploads/1939250/800_crop_5ce60a12aa5c7_5ce609faba63f.jpg"
    },
    {
      name: "PetDen ",
      city: "Tumbes",
      store: "Solve Store",
      address: "75001 Paris",
      directionsUrl: "#",
      image: "https://th.bing.com/th/id/OIP.l6HvAaSesbJ_gkJ8MCCmKAHaFF?rs=1&pid=ImgDetMain"
    },
    {
      name: "RefugePet",
      city: "Ayacucho",
      store: "Solve Store",
      address: "100-0001 Tokyo",
      directionsUrl: "#",
      image: "https://pawssionproject.org.ph/wp-content/uploads/2021/07/Bulacan-4.jpg"
    }
  ];

  return (
    <div className="store-locations-page">
      <HorizontalScrollSection>
        {locations.map((location, index) => (
          <div key={index} className="location-slide">

            <div className="location-name">{location.name}</div>
            
            <div className="location-details">
              <h3 className="location-city">{location.city}</h3>
              <p className="location-address">{location.store}</p>
              <p className="location-address">{location.address}</p>
              <a href={location.directionsUrl} className="directions-link">
                GET DIRECTIONS 
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464466C11.9763 0.269204 11.6597 0.269204 11.4645 0.464466C11.2692 0.659728 11.2692 0.976311 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553C11.6597 7.7308 11.9763 7.7308 12.1716 7.53553L15.3536 4.35355ZM0 4.5H15V3.5H0V4.5Z" fill="black"/>
                </svg>
              </a>
            </div>

            <div className="location-image">
              <img src={location.image} alt={location.name} />
            </div>
            
            {index === locations.length - 1 && (
              <style jsx>{`
                .location-slide:last-child {
                  border-right: none;
                }
              `}</style>
            )}
          </div>
        ))}
      </HorizontalScrollSection>
    </div>
  );
}