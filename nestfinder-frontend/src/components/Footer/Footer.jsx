import './Footer.css'
import  { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <p>&copy; 2025 NestFinder</p>
    </div>
    <div className="footer-socials">
      <p>
        Follow us on:
        <span className="react-social">
          <a
            href="https://twitter.com/that_tech_guy43"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookSquare />
            Facebook
          </a>
        </span>
        <span className="react-social">
          <a
            href="https://facebook.com/yourcompany"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitterSquare /> Twitter
          </a>
        </span>
        <span className="react-social">
          <a
            href="https://instagram.com/genix43649"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSquareInstagram /> Instagram
          </a>
        </span>
      </p>
    </div>
  </footer>
);

export default Footer;