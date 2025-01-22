import { useState, useContext } from 'react';
import './Payment.css';
import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;
const endPoint = "payment";

const Payment = () => {
    const [authorizationUrl, setAuthorizationUrl] = useState('');
    const [amount, setAmount] = useState(0);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();

    // useEffect(() => {
    // const getAuthorizationUrl = async () => {
    //   try {
    //     const response = await fetch(`${baseUrl}${endPoint}/`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Referer: "http://localhost:5173",
    //       },
    //       body: JSON.stringify({ email, amount: myVariable?.price || 0 }),
    //       credentials: "include",
    //     });
    //     const data = await response.json();
    //     setAuthorizationUrl(data.authorization_url);
    //   } catch (error) {
    //     console.error(`Error fetching authorization URL: ${error}`);
    //   }
    // };

//     getAuthorizationUrl();
//   }, [myVariable?.price])

    return (
        <div className="payment-confirmation">
        <h2>Payment Confirmation</h2>
        <p>You are about to make a payment of:</p>
        <div className="payment-amount">
            <span>₦{amount.toLocaleString()}</span>
        </div>
        <p>Please confirm your payment to proceed.</p>
            <div className="payment-actions">
                <button 
                  className="confirm-payment"
                //   onClick={() => `window.location.href=${response.data.authorization_url}`}
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