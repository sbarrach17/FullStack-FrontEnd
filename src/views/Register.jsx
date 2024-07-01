import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import { validarRut } from "../utils/validarRut";
import Swal from "sweetalert2";
import "../css/Register.css";

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
        <div className="containter-registers">
        <div className="form-containers">
	<p className="title">CREAR CUENTA</p>
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
			<label >Rut</label>
			<input type="text" name="rut" onChange={handleUser}  value={user.rut}/>
		</div>
			<div className="input-group">
			<label >Email</label>
			<input type="text" name="email" onChange={handleUser}  value={user.email}/>
		</div>
		<div className="input-group">
			<label >Password</label>
			<input type="password" name="password"onChange={handleUser}   value={user.password}/>
			<div className="forgot">
				<a rel="noopener noreferrer" href="#"></a>
			</div>
		</div>
        <button type="submit" className="sign mt-3">
          REGISTRAR
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
    </div>
);
};


export default Register;