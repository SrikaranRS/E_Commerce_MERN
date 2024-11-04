import React from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Assuming you create a CSS file for custom styles
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';

const Profile = () => {
    const { isAuthenticated, user } = useSelector((state) => state.authState);

    const navigate=useNavigate()

    return (
        <div className="container mt-2 p-3">
            <MetaData title="Profile"/>
            <h1 className="mb-4 profile-header">Profile Details</h1>
            {isAuthenticated ? (
                <div className="row">
                    <div className="col-md-4 text-center"  style={{display:"flex",flexDirection:"column"}}>
                        <img
                            src={user.avatar}
                            alt="User Avatar"
                            className="img-fluid rounded-circle mb-3"
                            style={{ width: '280px', height: '280px' }} // Avatar size
                        />
                        <button className="btn btn-primary mt-2 ms-5 w-50" onClick={()=>{navigate('/profile/editprofile')}}>Edit Profile</button> {/* Button under avatar */}
                    </div>
                    {/* Right Column for User Details */}
                    <div className="col-md-8 ">
                        <h5 className="profile-heading">Full Name</h5>
                        <p className="profile-text">{user.name}</p>
                        
                        <h5 className="profile-heading">Email</h5>
                        <p className="profile-text">{user.email}</p>
                        
                        <h5 className="profile-heading">Joined</h5>
                        <p className="profile-text">{new Date(user.createdAt).toLocaleDateString()}</p>
                        
                        {/* Buttons for additional actions */}
                        <div className="btn-group-vertical mt-1">
                            <button className="btn btn-secondary mb-2">My Orders</button>
                            <button className="btn btn-warning" onClick={()=>{navigate('/profile/changepassword')}}>Change Password</button>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Please log in to see your profile.</h1>
            )}
        </div>
    );
}

export default Profile;
