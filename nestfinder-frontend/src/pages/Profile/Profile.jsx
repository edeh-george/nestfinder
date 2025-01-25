import { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'


const baseUrl = import.meta.env.VITE_API_URL;
const endPoint = 'user/';


const Profile = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(baseUrl + endPoint, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            setUser(response.data);
            setProfile(response.data.profile);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    if (loading) {
        return <h1>Fetching user data</h1>
    }

    return (
        <>
            <div className="profile-section">
                <h1 className="page-info">User Profile</h1>
                <div className="user-main-info">
                    <img
                        src={profile.profile_picture}
                        alt="User Profile"
                        className="profile-picture"
                    />
                    <div className="user-main-info-text">
                        <h1>{user.username}</h1>
                        <p>{user.email}</p>
                        <p>{profile.phone_number}</p>
                        <p>{profile.field_of_study}</p>
                    </div>
                </div>
                <div className="other-section">
                    <div className="user-info">
                        <h2>Profile Information</h2>
                        <p>First Name: <br /> {user.first_name}</p>
                        <p>Last Name: <br /> {user?.last_name || "N/A"}</p>
                        <p>Email Address: <br /> {user.email}</p>
                        <p>Year of Study: <br /> {user.profile?.year_of_study}</p>

                    </div>
                    <div className="user-preferences">
                        <h2>User Preferences</h2>
                        <p>Max-budget: <br /> {user.profile.budget_range_max}</p>
                        <p>Bio: <br /> {user.profile?.bio || "N/A"} </p>
                    </div>
                </div>
            </div>
            
        </>

    );
}

export default Profile;