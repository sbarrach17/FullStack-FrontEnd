import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ editUser }) => {
    const [user, setUser] = useState({
        nombre: "",
        apellido: "",
        newPassword: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener el correo electrónico del usuario si está disponible
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

        // Validar que los campos obligatorios estén completos
        if (!user.nombre || !user.apellido || !user.newPassword) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Todos los campos son obligatorios.",
            });
            return;
        }

        // Enviar la solicitud PUT al servidor utilizando la función editUser
        editUser(user)
            .then(() => {
                // Mostrar un mensaje de éxito al usuario
                Swal.fire({
                    icon: "success",
                    title: "Usuario Actualizado",
                    text: "Datos de usuario actualizados.",
                });
                // Limpiar los datos de sesión
                localStorage.removeItem("userToken");
                localStorage.removeItem("userEmail");
                // Redirigir al usuario a la página de inicio de sesión
                navigate("/login");
            })
            .catch((error) => {
                // Manejar errores de la solicitud
                console.error("Error al actualizar usuario:", error);
                if (error.response) {
                    // El servidor respondió con un código de estado fuera del rango 2xx
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: `Error al actualizar usuario: ${error.response.data.message}`,
                    });
                } else if (error.request) {
                    // No se recibió respuesta del servidor
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No se pudo establecer conexión con el servidor.",
                    });
                } else {
                    // Otros errores
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.",
                    });
                }
            });
    };

    return (
        <form
            onSubmit={handleForm}
            className="col-10 col-sm-6 col-md-3 m-auto mt-5"
        >
            <h1>Actualizar Perfil</h1>
            <hr />
            <div className="form-group mt-1 ">
                <label>Nombre </label>
                <input
                    value={user.nombre}
                    onChange={handleUser}
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="Nombre"
                />
            </div>
            <div className="form-group mt-1 ">
                <label>Apellido </label>
                <input
                    value={user.apellido}
                    onChange={handleUser}
                    type="text"
                    name="apellido"
                    className="form-control"
                    placeholder="Apellido"
                />
            </div>
            <div className="form-group mt-1 ">
                <label>Password</label>
                <input
                    value={user.newPassword}
                    onChange={handleUser}
                    type="password"
                    name="newPassword"
                    className="form-control"
                    placeholder="Password"
                />
            </div>
            <button type="submit" className="btn btn-danger mt-3">
                Actualizar
            </button>
        </form>
    );
};

export default EditProfile;


































