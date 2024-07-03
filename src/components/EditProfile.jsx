import React, { useState, useEffect, useContext } from "react";
import { successToast, errorToast } from "../utils/toast.js"; // Importa tus funciones de toast
import "../css/EditProfile.css";
import { GlobalContext } from "../contexts/GlobalContext.jsx";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const { getDeveloper, editUser } = useContext(GlobalContext);
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    newPassword: "",
  });

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setUser((prevUser) => ({
        ...prevUser,
        email: userEmail,
      }));
    }
  }, []);

  const handleUser = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const handleForm = (event) => {
    event.preventDefault();

    if (!user.nombre || !user.apellido || !user.newPassword) {
      errorToast("Todos los campos son obligatorios.");
      return;
    }

    editUser(user)
      .then(() => {
        successToast("Datos de usuario actualizados.");
        localStorage.removeItem("userToken");
        localStorage.removeItem("userEmail");
      })
      .catch((error) => {
        console.error("Error al actualizar usuario:", error);
        if (error.response) {
          errorToast(
            `Error al actualizar usuario: ${error.response.data.message}`
          );
        } else if (error.request) {
          errorToast("No se pudo establecer conexión con el servidor.");
        } else {
          errorToast(
            "Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
          );
        }
      });
  };

  return (
    
    <div className="form-container">
    <p className="title text-uppercase">{getDeveloper?.nombre} {getDeveloper?.apellido}</p>
    <p className="title">{getDeveloper?.email}</p>
    <p>EDITAR PERFÍL</p>
    <form className="form" onSubmit={handleForm}>
      <div className="input-group">
        <label >Nombre</label>
        <input type="text" name="nombre" onChange={handleUser}  value={user.nombre}/>
      </div>
      <div className="input-group">
        <label >Apellido</label>
        <input type="text" name="apellido" onChange={handleUser}  value={user.apellido} />
      </div>
     
      <div className="input-group">
        <label >Password</label>
        <input type="password" name="newPassword" onChange={handleUser}   value={user.newPassword}/>
        <div className="forgot">
          <a rel="noopener noreferrer" href="#"></a>
        </div>
      </div>
          <button type="submit" className="sign mt-3">
            ACTUALIZAR
          </button>
    </form>
    <div className="social-message">
      <div className="line"></div>
      <p className="message"></p>
      <div className="line"></div>
    </div>
    <div className="social-icons">
    
    
    
    </div>
    
  </div>
  );
};

export default EditProfile;
