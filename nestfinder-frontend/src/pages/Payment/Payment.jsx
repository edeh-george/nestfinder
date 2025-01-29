import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentContext from '../../contexts/PaymentContext';
import axios from 'axios';
import './Payment.css';

const baseUrl = import.meta.env.VITE_API_URL;
const endPoint = "payment/initiate";

const Payment = () => {
    const [authorizationUrl, setAuthorizationUrl] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { price } = useContext(PaymentContext);
    const navigate = useNavigate();

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`${baseUrl}user/`, {
                    withCredentials: true,
                });
                setEmail(data.email);
                setName(data.username);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    // Fetch payment authorization URL
    useEffect(() => {
        const getAuthorizationUrl = async () => {
            if (!email) return;

            try {
                const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)?.[1];
                const { data } = await axios.post(
                    `${baseUrl}${endPoint}/`,
                    {
                        email,
                        amount: price || 0,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRFToken": csrfToken,
                        },
                        withCredentials: true,
                    }
                );
                setAuthorizationUrl(data.data.authorization_url);
            } catch (error) {
                console.error(`Error fetching authorization URL: ${error}`);
            }
        };

        getAuthorizationUrl();
    }, [email, price]);

    return (
        <div className="payment-confirmation">
            <h2>Payment Confirmation</h2>
            <p>{name}, You are about to make a payment of:</p>
            <div className="payment-amount">
                <span>₦{price.toLocaleString()}</span>
            </div>
            <p>Please confirm your payment to proceed.</p>
            <h2>Payment Confirmation</h2>
            <p>{name}, You are about to make a payment of:</p>
            <div className="payment-amount">
                <span>₦{price.toLocaleString()}</span>
            </div>
            <p>Please confirm your payment to proceed.</p>
            <div className="payment-actions">
                <button
                    className="confirm-payment"
                    onClick={() => {
                        if (authorizationUrl) {
                            window.location.href = authorizationUrl;
                        } else {
                            console.error("Authorization URL not available");
                        }
                    }}
                >
                    Confirm Payment
                </button>
                <button className="cancel-payment" onClick={() => navigate(-1)}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Payment;
