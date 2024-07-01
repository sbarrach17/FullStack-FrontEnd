// import axios from 'axios'
// import { toast } from "react-toastify";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import { successToast, errorToast } from "../utils/toast.js"; // Update the path to your toast functions
import '../css/Login.css'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = { email: "", password: "" };

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialForm);
  const { login } = useContext(GlobalContext);

  const handleUser = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const handleForm = async (event) => {
    event.preventDefault();

    if (!user.email.trim() || !user.password.trim()) {
      errorToast("Email y password obligatorias.");
      return;
    }

    if (!emailRegex.test(user.email)) {
      errorToast("El formato de email no es correcto.");
      return;
    }

    try {
      await login(user, navigate);
      successToast("Bienvenido");
    } catch (error) {
      errorToast("Email o Contraseña incorrectos");
      console.error("Error durante login:", error);
    }
  };

  return (
    <div className="containter-regist">
 <div className="form-contain">
	<p className="title">INICIAR SESIÓN</p>
	<form className="form" onSubmit={handleForm}>

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
          ACCEDER
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

export default Login;
