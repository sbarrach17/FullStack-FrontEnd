import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext.jsx";
import EditProfile from "../components/EditProfile";
// import { Link } from "react-router-dom";
import '../css/EditProfile.css';

const Profile = () => {
  const { getDeveloper } = useContext(GlobalContext);

  return (
    <div className="me-2 mt-5">
      <div className="d-flex justify-content-center">
      <EditProfile />
      </div>  
    </div>
  );
};

export default Profile;
