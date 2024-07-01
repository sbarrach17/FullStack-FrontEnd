import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../contexts/Context";
import "../css/Navigation.css";

const Navigation = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);

  const logout = () => {
    setDeveloper();
    window.sessionStorage.removeItem("token");
    navigate("/");
  };

  const isLogin = () => {
    if (!getDeveloper) {
      return (
        <>
          <Link to="/registrarse" className="nav-link ">
          <button className="value">
          Registrar
          </button>
          </Link>
          <Link to="/login" className="nav-link ">
          <button className="value">
          Acceder <i className="fa-solid fa-right-to-bracket ms-2"></i>
          </button>
          </Link>
        </>
      );
    }

    return (
      <>
        <Link to="/collection" className="nav-link ">
        <button className="value">
          Home
          </button>
        </Link>
        <Link to="/favoritos" className="nav-link  ">
        <button className="value">
          Favoritos
          </button>
        </Link>
        <Link to="/carro" className="nav-link  ">
        <button className="value">
          Carro
          </button>
        </Link>      
        <div className="nav-link dropdown">
    <button className="value dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
      Opciones<i class="fa-solid fa-gear ms-2"></i>
    </button>
    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <li>
        <Link to="/perfil" className="dropdown-item">
          Perfíl <i class="fa-solid fa-user-pen ms-2"></i>
        </Link>
      </li>
      <li>
        <Link to="/agregarProducto" className="dropdown-item">
          Agregar <i className="fa-solid fa-tags ms-2"></i>
        </Link>
      </li>
      <li>
        <Link to="/publicaciones" className="dropdown-item">
          Publicaciones <i class="fa-solid fa-file-pen ms-2"></i>
        </Link>
      </li>     
    </ul>
  </div>
        <Link to="/login" className="nav-link" onClick={logout}>
        <button className="value">
       Salir <i className=" icon fa-solid fa-arrow-right-from-bracket ms-2" ></i>
          </button>
        </Link>

      </>
    );
  };

  return (
     <nav className="navbar navbar-expand-lg  ">
       <div className="container-fluid">
         <Link to="/" className="navbar-brand logo">
         Alpha Moto
         </Link>
         <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">{isLogin()}</ul>
        </div>
      </div>
    </nav>

  );
};

export default Navigation;
