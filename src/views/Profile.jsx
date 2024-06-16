import React, { useContext } from "react";
import { GlobalContext } from "..//contexts/GlobalContext";
import EditProfile from "../components/EditProfile";
import { Link } from "react-router-dom";

const Profile = () => {
  const { getDeveloper, editUser } = useContext(GlobalContext);

  return (
    <div className="py-5">
      <h1>Bienvenido</h1>
      <div className="d-flex flex-column">
        <h3 className="d-flex flex-column">
          <span className="fw-bold">{getDeveloper?.email}</span>
          {getDeveloper?.nombre} {getDeveloper?.apellido}
        </h3>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-warning dropdown-toggle text-white"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ><span>
         <i className="fa-solid fa-sliders text-white"></i> Opciones</span>
        </button>
        <ul className="dropdown-menu">
          <li>
            <Link className="dropdown-item" to="/agregarProducto">
              Agregar Productos
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/publicaciones">
              Mis Publicaciones
            </Link>
          </li>
        </ul>
      </div>
      <EditProfile editUser={editUser} />
    </div>
  );
};

export default Profile;
