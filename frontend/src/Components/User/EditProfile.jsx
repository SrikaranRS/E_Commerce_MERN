import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layouts/Loader";
import MetaData from "../Layouts/MetaData";
import { clearError, updateProfile } from "../../actions/userActions"; 
import { useNavigate } from "react-router-dom";

const avatars = [
  { src: "/images/avatar/boy.png", label: "Boy" },
  { src: "/images/avatar/girl.png", label: "Girl" },
  { src: "/images/avatar/woman.png", label: "Woman" },
  { src: "/images/avatar/gamer.png", label: "Gamer" },
  { src: "/images/avatar/woman (2).png", label: "Woman" },
  { src: "/images/avatar/hacker.png", label: "Techie" },
];

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler  = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name)
    formData.append('email', email)
    formData.append('avatar', avatar);
    dispatch(updateProfile(formData))
    navigate('/profile')
}

useEffect(() => {
    if(user) {
        setName(user.name);
        setEmail(user.email);
        setAvatar(user.avatar)
    }
},[user])
  

  if (loading) return <Loader />;

  return (
    <div className="p-4">
      <MetaData title="Edit Profile" />

      {errorMessage && (
        <div className="alert alert-danger text-center mt-4" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "white" }}>
        <div className="card p-4" style={{ width: "25rem", backgroundColor: "#f0f9ff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <h4 className="text-center text-info mt-3">Edit Profile</h4>

          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="avatar" className="form-label">Choose an Avatar</label>
              <div className="d-flex align-items-center">
                <select
                  className="form-select me-2"
                  id="avatar"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  required
                >
                  <option value="">Select an avatar</option>
                  {avatars.map((avatarOption, index) => (
                    <option key={index} value={avatarOption.src}>
                      {avatarOption.label}
                    </option>
                  ))}
                </select>
                {avatar && (
                  <img
                    src={avatar}
                    alt="Selected Avatar"
                    style={{ width: "60px", height: "50px", borderRadius: "50%" }}
                  />
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-info w-100" style={{ color: "white" }}>
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
