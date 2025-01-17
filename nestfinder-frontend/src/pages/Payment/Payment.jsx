import { useState } from 'react';
import './Payment.css';
import { useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;
const endPoint = "payment";

const Payment = (amount) => {
    const [email, setEmail] = useState('');
    const [authorizationUrl, setAuthorizationUrl] = useState('');
    const navigate = useNavigate();

    const getAuthorizationUrl = async () => {
        try {
            const response = await fetch(`${baseUrl}${endPoint}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Referer': 'http://localhost:5173'
                },
                body: JSON.stringify({ email: 'email', amount: 'amount' }),
                credentials: 'include'
            })
            setAuthorizationUrl(response.data);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(`Error fetching authorization URL: ${error}`);
        }
    };

    const response =  getAuthorizationUrl();

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
                  onClick={() => `window.location.href=${response.data.authorization_url}`}>
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