import { useState } from 'react';
import './Login.css';
import auth from '../../assets/auth.jpg'
import {Link} from 'react-router-dom'
import useClearError from '../../components/clearMessage'
import  { useNavigate } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_API_URL;
const endPoint = 'token/';
const fullUrl = new URL(endPoint, baseUrl).toString();

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    //remember_me should be part of this body
                }),
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                navigate("/houses/", { replace: true });
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Login failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    useClearError(errorMessage, setErrorMessage);

    return (
        <>
            <div className="login-container">
                <form className="login-form" onSubmit={ handleSubmit}>
                    <h2>Welcome back</h2>
                    <p>Please enter your details to journey to be nested</p>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
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
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="remember-forgot">
                        <label htmlFor="checkbox" className="remember-me">
                            <input 
                            type="checkbox"
                            name="remember_me"
                            id="checkbox" 
                            />
                            remember me
                        </label>
                        <Link to="/forgot-password" className='forgot-password'>
                            Forgot Password?
                        </Link>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <p className="signup-link">
                        Don't have an account? <Link to="/signup">Sign up here</Link>
                    </p>
                </form>
            </div>
            <div className='image-container'>
                <img src={auth} alt="login-image" />
            </div>
        </>
    );
};

export default Login;
