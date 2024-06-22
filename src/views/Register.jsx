import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import { validarRut } from "../utils/validarRut";
import Swal from "sweetalert2";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = {
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    password: "",
};

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(initialForm);
    const { registerUser } = useContext(GlobalContext);

    const handleUser = (event) => {
        const { name, value } = event.target;
        if (name === "rut") {
            setUser({ ...user, [name]: formatoRut(value) });
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    const handleForm = async (event) => {
        event.preventDefault();

        if (
            !user.nombre.trim() ||
            !user.apellido.trim() ||
            !user.rut.trim() ||
            !user.email.trim() ||
            !user.password.trim()
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

        // Validar RUT
        if (!validarRut(user.rut)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El RUT ingresado no es válido.",
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
            if (error && error.message === "Email ya existe") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El correo electrónico ya está en uso. Por favor, elige otro.",
                });
            } else if (error && error.message === "Rut ya existe") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El RUT ya está registrado. Por favor, verifica los datos.",
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

    // Función para dar formato al RUT
    const formatoRut = (rut) => {
        rut = rut.replace(/[^\dkK.-]/g, ""); // Eliminar caracteres no válidos
        let cleanedRut = rut.replace(/[^0-9kK]/g, ""); // Quitar todo excepto números y K
        if (cleanedRut.length > 1) {
            cleanedRut = cleanedRut.substring(0, cleanedRut.length - 1) + '-' + cleanedRut.substring(cleanedRut.length - 1);
        }
        return cleanedRut;
    };

    return (
        <form onSubmit={handleForm} className="col-10 col-sm-6 col-md-3 m-auto mt-5">
            <h1>Registrar nuevo usuario</h1>
            <hr />
            <div className="form-group mt-1">
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
            <div className="form-group mt-1">
                <label>Rut</label>
                <input
                    value={user.rut}
                    onChange={handleUser}
                    type="text"
                    name="rut"
                    className="form-control"
                />
            </div>
            <div className="form-group mt-1">
                <label>Email</label>
                <input
                    value={user.email}
                    onChange={handleUser}
                    type="email"
                    name="email"
                    className="form-control"
                />
            </div>
            <div className="form-group mt-1">
                <label>Password</label>
                <input
                    value={user.password}
                    onChange={handleUser}
                    type="password"
                    name="password"
                    className="form-control"
                />
            </div>
            <button type="submit" className="button mt-3">
                Registrarme
            </button>
        </form>
    );
};

export default Register;
