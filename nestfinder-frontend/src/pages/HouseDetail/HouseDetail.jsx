import React from 'react';
import './HouseDetail.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL
const endPoint = 'apartment'

const HouseDetail = () => {
    // const { apartmentId } = useParams();
    const apartmentId = "ef2589c0-13b6-448f-a510-3a6ff0758436";
    const [apartment, setApartment] = useState(null);
    const fullUrl = `${baseUrl}${endPoint}/${apartmentId}/`;

    useEffect(() => {
        const getApartment = async () => {
            try {
                const response = await axios.get(fullUrl);
                setApartment(response.data);
            } catch (error) {
                if (error.response) {
                    console.error(
                        "Server error:",
                        error.response.data,
                        error.response.status
                    );
                } else if (error.request) {
                    console.error(
                        "No response received from the server:",
                        error.request
                    );
                } else {
                    console.error(
                        "Error setting up request:",
                        error.message
                    );
                }
            }
        };

        getApartment();
    }, [apartmentId, fullUrl]);

    if (!apartment) {
        return <div>Loading...</div>;
    }
    console.log(apartment)
  return (
    <div className="house-detail">
      <section className="hero">
        <img src={apartment.image} alt={name} className="hero-image" />
        <div className="hero-overlay">
          <h1 className="apartment-name">{apartment.name}</h1>
          <p className="apartment-location">{location}</p>
          <p className="apartment-price">₦{apartment.price.toLocaleString()}</p>
          <div className="hero-buttons">
            <button>Schedule a Visit</button>
            <button>Contact Agent</button>
            <button>Save to Favorites</button>
          </div>
        </div>
      </section>

      <section className="key-details">
        <h2>Key Details</h2>
        <ul>
          <li>Type: {apartment.apartment_type}</li>
          <li>Location: {apartment.location}</li>
          <li>Price: ₦{apartment.price.toLocaleString()}</li>
          <li>Status: {apartment.is_leased ? "Leased" : "Available"}</li>
          <li>Uploaded By: {apartment.uploaded_by}</li>
        </ul>
      </section>

      <section className="image-gallery">
        <h2>Gallery</h2>
        <div className="gallery-images">
          {apartment.image_url_list.map((img, index) => (
            <img src={img} alt={`House ${index + 1}`} key={index} />
          ))}
        </div>
      </section>

      <section className="description">
        <h2>Description</h2>
        <p>{apartment.description}</p>
      </section>

      <section className="features">
        <h2>Features</h2>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="location-map">
        <h2>Location</h2>
        <iframe
          src={mapUrl}
          title="House Location"
          className="map"
          loading="lazy"
        ></iframe>
      </section>

      {reviews && reviews.length > 0 && (
        <section className="reviews">
          <h2>Reviews</h2>
          {reviews.map((review, index) => (
            <div className="review" key={index}>
              <p>{review.comment}</p>
              <span>{'⭐'.repeat(review.rating)}</span>
            </div>
          ))}
        </section>
      )}

      <section className="contact">
        <h2>Contact Agent</h2>
        <p>Phone: {contact.phone}</p>
        <p>Email: {contact.email}</p>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      <section className="related-listings">
        <h2>Related Listings</h2>
        <div className="related-houses">
          {house.relatedHouses.map((related, index) => (
            <div className="related-house" key={index}>
              <img src={related.image} alt={related.name} />
              <p>{related.name}</p>
              <p>₦{related.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HouseDetail;
