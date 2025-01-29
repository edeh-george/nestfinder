import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentContext from '../../contexts/PaymentContext';
import axios from 'axios';
import './Payment.css';

const baseUrl = import.meta.env.VITE_API_URL;
const endPoint = "payment";


const Payment = () => {
    const [authorizationUrl, setAuthorizationUrl] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const { price } = useContext(PaymentContext)
    const navigate = useNavigate();

    function getCookie(name) {
      var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : null;
    }

    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}user/`, {
          withCredentials: true
        });
        setEmail(data.email);
        setName(data.username);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    useEffect(() => {
    const getAuthorizationUrl = async () => {
      try {
        const csrfToken = getCookie("csrftoken");  
        console.log(csrfToken)      
        const response = await axios.post(`${baseUrl}${endPoint}/`,{ 
            email, 
            amount: price || 0 
          },{
            headers: {
              "Content-Type": "application/json",
              "x-csrf-token": csrfToken
            },
            wiThCredentials: true,
      });
        const data = await response.json();
        setAuthorizationUrl(data.authorization_url);
      } catch (error) {
        console.error(`Error fetching authorization URL: ${error}`);
      }
    };

    getAuthorizationUrl();
    fetchUser();
  }, [])

    return (
        <div className="payment-confirmation">
        <h2>Payment Confirmation</h2>
        <p>{name}, You are about to make a payment of:</p>
        <div className="payment-amount">
            <span>₦{price.toLocaleString()}</span>
        </div>
        <p>Please confirm your payment to proceed.</p>
            <div className="payment-actions">
                <button 
                  className="confirm-payment"
                  onClick={() => navigate(window.location.href=response.data.authorization_url, { replace: true})}
                >
                    Confirm Payment
                </button>
                <button 
                  className="cancel-payment"
                  onClick={()=> navigate(-1)}
                  >
                      Cancel
                </button>
            </div>
        </div>
    );
};


export default Payment