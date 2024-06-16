// import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
// import { ENDPOINT } from "../config/constants";
import Swal from "sweetalert2";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = {
    email: "",
    password: "",
    nombre: "",
    apellido: "",
};

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(initialForm);
    const { registerUser } = useContext(GlobalContext);

    const handleUser = (event) =>
        setUser({ ...user, [event.target.name]: event.target.value });

    const handleForm = async (event) => {
        event.preventDefault();

        if (
            !user.email.trim() ||
            !user.password.trim() ||
            !user.nombre.trim() ||
            !user.apellido.trim()
        ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Todos los campos son obligatorios. Por favor, complétalos.",
            });
            return;
        }

        if (!emailRegex.test(user.email)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El formato del correo electrónico no es válido.",
            });
            return;
        }

        try {
            await registerUser(user);
            Swal.fire({
                icon: "success",
                title: "¡Registro exitoso!",
                text: "Usuario registrado con éxito.",
            });
            navigate("/login");
        } catch (error) {
            console.error("Error during registration:", error);
            if (error && error.message === "Email already exists") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El correo electrónico ya está en uso. Por favor, elige otro.",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo salió mal. Por favor, inténtalo de nuevo más tarde.",
                });
            }
        }
    };

    return (
        <form onSubmit={handleForm} className="col-10 col-sm-6 col-md-3 m-auto mt-5">
            <h1>Registrar nuevo usuario</h1>
            <hr />
            <div className="form-group mt-1 ">
                <label>Email</label>
                <input
                    value={user.email}
                    onChange={handleUser}
                    type="email"
                    name="email"
                    className="form-control"
                />
            </div>
            <div className="form-group mt-1 ">
                <label>Password</label>
                <input
                    value={user.password}
                    onChange={handleUser}
                    type="password"
                    name="password"
                    className="form-control"
                />
            </div>
            <div className="form-group mt-1 ">
                <label>Nombre</label>
                <input
                    value={user.nombre}
                    onChange={handleUser}
                    type="text"
                    name="nombre"
                    className="form-control"
                />
            </div>
            <div className="form-group mt-1">
                <label>Apellido</label>
                <input
                    value={user.apellido}
                    onChange={handleUser}
                    type="text"
                    name="apellido"
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-danger mt-3">
                Registrarme
            </button>
        </form>
    );
};

export default Register;
