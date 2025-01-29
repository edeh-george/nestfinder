import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing">
      <header className="landing-header">
        <h1>NestFinder</h1>
        <p>Find Your Perfect Off-Campus Home, Easily & Securely.</p>
        <Link to="/login" className="cta-button">Find Accommodation</Link>
      </header>

      <section className="features">
        <div className="feature">
          <h2>📍 Location-Based Search</h2>
          <p>Find housing close to your campus with real-time location filtering.</p>
        </div>
        <div className="feature">
          <h2>💰 Affordable Listings</h2>
          <p>Compare prices and choose accommodations that fit your budget.</p>
        </div>
        <div className="feature">
          <h2>🔒 Secure & Verified</h2>
          <p>All listings are verified to ensure your safety and comfort.</p>
        </div>
      </section>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} NestFinder. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
