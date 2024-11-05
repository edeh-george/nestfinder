import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import auth from '../../assets/auth.jpg'
import './Signup.css';
import {Link} from 'react-router-dom'


const baseUrl = import.meta.env.VITE_API_URL;
const endPoint = 'api/v1/signup/';
const fullUrl = new URL(endPoint, baseUrl).toString();

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (count > 3) {
            setErrorMessage('There seems to be a problem. Please try again later.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    _password: passwordConfirm
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('Your account has successfully been created');
                setErrorMessage('');
            } else {
                console.log(response.data);
                setErrorMessage('Signup failed, please try again');
                setCount((prevCount) => prevCount + 1);
            }
        } catch (error) {
            console.error('Signup error:', error);
            setErrorMessage('An unexpected error occurred, please try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="signup-container">
                <div className="signup-form">
                    <h2>Create your account</h2>
                    <p>Let's guide you on your journey to be nested</p>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {/* redirect user if successMessage evals to true */}
                    <button className="google-login">
                        <span className="google-icon"><FcGoogle /></span>
                        <span className="google-icon-text">Login with Google</span>
                    </button>
                    <p className="or-text">or</p>
                    <form onSubmit={onSubmit}>
                        <div className="input-group">
                            <label htmlFor="name">Name*</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email*</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password*</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password-again">Confirm password*</label>
                            <input
                                type="password"
                                id="password-again"
                                placeholder="Enter your password again"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                required
                            />
                        </div>

                        <div className="terms">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                required
                            />
                            <span className="terms-text">I agree to all Terms, Privacy Policy, and Fees</span>
                        </div>

                        <button className="signup-btn" type="submit" disabled={!isChecked || loading}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                    <p className="login-link">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </div>
            </div>
            <div className='image-container'>
                <img src={auth} alt="login-image" />
            </div>
        </>
    );
};

export default Signup;
