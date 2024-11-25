import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './HouseDetail.css';

const baseUrl = import.meta.env.VITE_API_URL;
const endPoint = 'apartment';

const HeroSection = ({
    image,
    image_url_list,
    name,
    location,
    price,
    isModalOpen,
    setIsModalOpen,
    currentImageIndex,
    setCurrentImageIndex,
    handleNextImage,
    handlePrevImage
}) => (
    <section className={`hero-section ${isModalOpen? 'blurred': ''}`}>
        <img src={image} alt={name} className="hero-image" />
        <button
            className="show-more-images-btn"
            onClick={() => setIsModalOpen(true)}
        >
            Show More Images
        </button>

        {/* Modal for images */}
        {isModalOpen && (
            <div className="image-modal">
                <div className="modal-content">
                    <span
                        className="close-modal"
                        onClick={() => setIsModalOpen(false)}
                    >
                        &times;
                    </span>
                    <img
                        src={image_url_list[currentImageIndex]}
                        alt={`House ${currentImageIndex + 1}`}
                        className="modal-image"
                    />
                    <button className="prev-arrow" onClick={handlePrevImage}>
                        &#8592;
                    </button>
                    <button className="next-arrow" onClick={handleNextImage}>
                        &#8594;
                    </button>
                </div>
            </div>
        )}

        <aside className="hero-details">
            <div className="hero-text">
                <h1 className="apartment-name">{name}</h1>
                <p className="apartment-location">{location}</p>
                <p className="apartment-price">₦{price.toLocaleString()}</p>
            </div>
            <div className="hero-buttons">
                <button>Schedule a Visit</button>
                <button>Contact Agent</button>
                <button>Save to Favorites</button>
            </div>
        </aside>
    </section>
);

const KeyDetails = ({ details }) => (
    <section className="key-details">
        <h2>Key Details</h2>
        <ul>
            <li>Type: {details.apartment_type}</li>
            <li>Location: {details.location}</li>
            <li>Price: ₦{details.price.toLocaleString()}</li>
            <li>Status: {details.is_leased ? "Leased" : "Available"}</li>
            <li>Uploaded By: {details.uploaded_by || "Unknown"}</li>
        </ul>
    </section>
);

const Description = ({ description }) => (
    <section className="description">
        <h2>Description</h2>
        <p>{description}</p>
    </section>
);

const Reviews = ({ reviews }) => (
    reviews.length > 0 && (
        <section className="reviews">
            <h2>Reviews</h2>
            {reviews.map((review, index) => (
                <div className="review" key={index}>
                    <p>{review.comment}</p>
                    <span>{'⭐'.repeat(review.rating)}</span>
                </div>
            ))}
        </section>
    )
);

const ContactSection = ({ contact }) => (
    <section className="contact">
        <h2>Contact Agent</h2>
        {contact ? (
            <>
                <p>Phone: {contact.phone || "N/A"}</p>
                <p>Email: {contact.email || "N/A"}</p>
            </>
        ) : (
            <p>Contact details not available.</p>
        )}
        <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
        </form>
    </section>
);

const RelatedListings = ({ relatedHouses }) => (
    relatedHouses.length > 0 && (
        <section className="related-listings">
            <h2>Related Listings</h2>
            <div className="related-houses">
                {relatedHouses.map((related, index) => (
                    <div className="related-house" key={index}>
                        <img src={related.image} alt={related.name} />
                        <p>{related.name}</p>
                        <p>₦{related.price.toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </section>
    )
);

const HouseDetail = () => {
    const { apartmentId } = useParams();
    const [apartment, setApartment] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const fetchApartmentDetails = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}${endPoint}/${apartmentId}/`);
            setApartment(data);
        } catch (error) {
            console.error("Error fetching apartment:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}reviews/${apartmentId}/`);
            setReviews(data.results || []);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        fetchApartmentDetails();
        fetchReviews();
    }, [apartmentId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!apartment) {
        return <div>No apartment data available.</div>;
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % apartment.image_url_list.length
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + apartment.image_url_list.length) % apartment.image_url_list.length
        );
    };

    const {
        name,
        location,
        price,
        apartment_type,
        is_leased,
        uploaded_by,
        description,
        image,
        image_url_list = [],
        relatedHouses = [],
        contact,
    } = apartment;

    return (
        <div className="house-detail">
            <HeroSection
                image={image}
                image_url_list={image_url_list}
                name={name}
                location={location}
                price={price}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                currentImageIndex={currentImageIndex}
                setCurrentImageIndex={setCurrentImageIndex}
                handleNextImage={handleNextImage}
                handlePrevImage={handlePrevImage}
            />
            {/* <KeyDetails
                details={{ apartment_type, location, price, is_leased, uploaded_by }}
            />
            <Description description={description} />
            <Reviews reviews={reviews} />
            <ContactSection contact={contact} />
            <RelatedListings relatedHouses={relatedHouses} /> */}
        </div>
    );
};

export default HouseDetail;
