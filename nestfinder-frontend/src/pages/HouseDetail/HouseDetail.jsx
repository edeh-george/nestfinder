import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import PaymentContext from "../../contexts/PaymentContext";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import "./HouseDetail.css";


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

  const ContactSection = ({ agent, userName, email, message, setMessage, setEmail, setUserName, handleSubmit, status, setStatus }) => (
    <section className="contact">
      <h2>Contact Agent</h2>
      {agent ? (
        <div className="agent-details">
          <p>Agent: {agent.username || "N/A"}</p>
          <p>Agent E-mail: {agent.email || "N/A"}</p>
        </div>
      ) : (
        <p>Contact details not available.</p>
      )}
      <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
        <input 
          id="contact-name" 
          type="text" 
          placeholder="Your Name" 
          value={userName}
          onChange = {(e) => setUserName(e.target.value)}
          required />

        <input 
          type="email" 
          placeholder="Enter your registered E-mail address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
      ></textarea>
        <button type="submit">{status? "Sending message..." : "Send Message"}</button>
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
    const [agentId, setAgentId] = useState(null)
    const [apartment, setApartment] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [agent, setAgent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const { setPrice } = useContext(PaymentContext);

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);

    const fetchApartmentDetails = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}${endPoint}/${apartmentId}/`);
            const updatedImageList = data.image_url_list ? [data.image, ...data.image_url_list] : [data.image];
            setApartment({ ...data, image_url_list: updatedImageList });
            setAgentId(data.uploader_id)
            setPrice(data.price);
            
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

    const fetchLandlord = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}user/${agentId}`, {
          withCredentials: true
        });
        setAgent(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };


    useEffect(() => {
      fetchApartmentDetails();
      fetchReviews();
    }, [apartmentId]);

    useEffect(() => {
        if (agentId) {
            fetchLandlord();
        }
    }, [agentId]);

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
      navigate(`/payment/`);
    };


    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus(true);
      if (!agent || !agent.email) {
        alert("Agent details are not available. Please try again later.");
        return;
      }
      try {
        const response = await axios.post(`${baseUrl}mail/send-mail/`, {
          name: userName,
          email: email,
          message: message,
          agentMail: agent.email,
        });
        if (response.status === 200) {
          alert("Message sent successfully");
          setUserName("");
          setEmail("");
          setMessage("");
          setStatus(false);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again later.");
        setStatus(false);

      }
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
          agent={agent}
          userName={userName}
          email={email}
          message={message}
          setEmail={setEmail}
          setUserName = {setUserName}
          setMessage={setMessage}
          handleSubmit={handleSubmit}
          status = {status}
          setStatus = {setStatus}/>
        <RelatedListings relatedHouses={relatedHouses} />
      </div>
    );
  };


export default HouseDetail;