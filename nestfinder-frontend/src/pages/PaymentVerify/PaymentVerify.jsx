import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
const verifyEndpoint = "payment/verify";

const PaymentVerify = () => {
  const [searchParams] = useSearchParams();
  const transactionRef = searchParams.get("reference");
  const [status, setStatus] = useState("Verifying...");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      if (!transactionRef) {
        setStatus("Invalid request: No transaction reference found.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.post(`${baseUrl}${verifyEndpoint}/`, { reference: transactionRef }, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        
        if (response.data.status === true) {
          setStatus("Payment successful! Redirecting...");
          setTimeout(() => navigate("/dashboard"), 3000);
        } else {
          setStatus("Payment failed or pending. Please try again.");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setStatus("An error occurred while verifying payment. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [transactionRef, navigate]);

  return (
    <div className="payment-verification">
      <h2>Payment Verification</h2>
      <p>{loading ? "Please wait..." : status}</p>
    </div>
  );
};

export default PaymentVerify;
