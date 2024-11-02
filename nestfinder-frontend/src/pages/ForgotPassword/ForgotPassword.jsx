import { useState } from 'react';
import 'ForgotPassword.css'
const env = import.meta.env


const baseUrl = env.VITE_API_URL;
const endPoint = 'api/v1/password/reset'
const fullUrl = new URL(endPoint, baseUrl).toString();


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setErrorMessage] = useState(null)
    const [success, setSuccessMessage] = useState(null)


    const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            try{
                const response = await fetch(fullUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                    })
                });

                if (response.ok){
                    const data = await response.json();
                    setSuccessMessage(data.message);
                }
                else{
                    const errorData = await response.json();
                    setErrorMessage(errorData.error);
                }
            } catch(error){
                setErrorMessage('An error occurred. Please try again.');
            } finally{
                setLoading(false);
            }
    };

    return (
        <>
        <div className='forgot-container'>
            <form className='forgot-form' onSubmit={handleSubmit}>
                <h2>Forgot password</h2>
                <p>Enter the email for your verified account</p>
            </form>
        </div>
        </>
    )
}