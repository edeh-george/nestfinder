import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./HouseDetail.css";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const baseUrl = import.meta.env.VITE_API_URL;
const endPoint = "apartment";

const HeroSection = ({
  image_url_list,
  name,
  location,
  price,
  currentImageIndex,
  handleNextImage,
  handlePrevImage,
  scrollToForm,
  initializePayment
}) => (
  <section className="hero-section">
    <div className="hero-image-container">
      <img
          src={image_url_list[currentImageIndex]}
          alt={`House ${currentImageIndex + 1}`}
          className="hero-image"
      />
      <span
          className={`prev-arrow ${currentImageIndex === 0 ? "disabled" : ""}`}
          onClick={handlePrevImage}>
        &lt;
      </span>
      <span
          className={`next-arrow ${
          currentImageIndex === image_url_list.length - 1 ? "disabled" : ""}`}
          onClick={handleNextImage}>
        &gt;
      </span>
    </div>

    <aside className="hero-details">
      <div className="hero-text">
        <h1 className="apartment-name">{name}</h1>
        <p className="apartment-location">{location}</p>
        <p className="apartment-price">₦{price.toLocaleString()}</p>
      </div>
      <div className="hero-buttons" id="hero-buttons">
        <button>Schedule a Visit</button>
        <button onClick={scrollToForm}>Contact Agent</button>
        <button onClick={ () => initializePayment(price)} >Make Payments </button>
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

const Reviews = ({ reviews }) =>
  reviews.length > 0 && (
    <section className="reviews">
      <h2>Reviews</h2>
      {reviews.map((review, index) => (
        <div className="review" key={index}>
          <div className="review-profile">
            <img src={review.profile.profile_picture} alt="user-profile-image" />
            <p>{review.profile.user}</p>
          </div>
            <span className="review-rating-created">
              {Array.from({ length: 5 }, (_, index) => (
                  <IoMdStar
                      key={index}
                      color={index < review.rating ? "#ffc107" : "#e4e5e9"} 
                  />
              ))}
              <h5>{review.created}</h5>
            </span>
            <p>{review.comment}</p>
            <br />
          </div>
        ))}
      </section>
    );

  const ContactSection = ({ userAgent, userName, email }) => (
    <section className="contact">
      <h2>Contact Agent</h2>
      {userAgent ? (
        <div className="agent-details">
          <p>Phone number: {userAgent.phone_number || "N/A"}</p>
          <p>Email: {userAgent.email || "N/A"}</p>
        </div>
      ) : (
        <p>Contact details not available.</p>
      )}
      <form className="contact-form" id="contact-form">
        <input 
          id="contact-name" 
          type="text" 
          placeholder="Your Name" 
          value={userName} 
          onChange = {(e) => setName(e.target.value)}
          required />

        <input 
          type="email" 
          placeholder="Your Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        <textarea placeholder="Your Message" required></textarea>
        {/* You are yet to add the mail submission logic for backend */ }
        <button type="submit">Send Message</button>
      </form>
    </section>
  );

  const RelatedListings = ({ relatedHouses }) =>
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
  );


const HouseDetail = () => {
    const { apartmentId } = useParams();
    const [userId, setUserId] = useState(null)
    const [apartment, setApartment] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [userAgent, setUserAgent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");

    const fetchApartmentDetails = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}${endPoint}/${apartmentId}/`);
            const updatedImageList = data.image_url_list ? [data.image, ...data.image_url_list] : [data.image];
            setApartment({ ...data, image_url_list: updatedImageList });
            setUserId(data.uploader_id)
        } catch (error) {
                console.error("Error fetching apartment:", error);
        } finally {
                setLoading(false);
            }
      };

    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}reviews/${apartmentId}/`, {
          withCredentials: true
        });
        setReviews(data.results || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}user/${userId}`, {
          withCredentials: true
        });
        setUserAgent(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };


    useEffect(() => {
      fetchApartmentDetails();
      fetchReviews();
    }, [apartmentId]);

    useEffect(() => {
        if (userId) {
            fetchUser();
        }
    }, [userId]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!apartment) {
      return <div>No apartment data available.</div>;
    }

    const handleNextImage = () => {
      setCurrentImageIndex((prevIndex) => {
        return prevIndex + 1 < image_url_list.length ? prevIndex + 1 : prevIndex;
      });
    };

    const handlePrevImage = () => {
      setCurrentImageIndex((prevIndex) => {
        return prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex;
      });
    };

    const scrollToForm = () => {
      const formSection = document.getElementById("contact-form");
      formSection.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        const firstInput = document.getElementById("contact-name");
        if (firstInput) firstInput.focus();
      }, 300);
    }

    const initializePayment = (price) => {
      
      navigate(`payment/`, {
        replace: true,
        });
    };


    const {
      name,
      location,
      price,
      apartment_type,
      is_leased,
      uploaded_by,
      description,
      image_url_list = [],
      relatedHouses = [],
    } = apartment;

    return (
      <div className="house-detail">
        <HeroSection
          image_url_list={image_url_list}
          name={name}
          location={location}
          price={price}
          currentImageIndex={currentImageIndex}
          handleNextImage={handleNextImage}
          handlePrevImage={handlePrevImage}
          scrollToForm={scrollToForm}
          initializePayment={initializePayment}
          />
        <KeyDetails
            details={{ apartment_type, location, price, is_leased, uploaded_by }}
        />
        <Description description={description} />
        <Reviews reviews={reviews} />
        <ContactSection 
          userAgent={userAgent}
          userName={userName}
          email = {email} 
          setEmail = {setEmail}
          setUserName = {setUserName}/>
        <RelatedListings relatedHouses={relatedHouses} />
      </div>
    );
  };


export default HouseDetail;
