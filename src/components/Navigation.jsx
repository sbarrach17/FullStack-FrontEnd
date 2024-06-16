import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../contexts/Context";

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
          <Link to="/registrarse" className="btn register-btn ms-2">
            Registrarse
          </Link>
          <Link to="/login" className="btn login-btn ms-2">
            Iniciar Sesión
          </Link>
        </>
      );
    }

    return (
      <>
        <Link to="/collection" className="nav-link " >
          Catalogo<i className="fa-solid fa-book-open-reader ms-2"></i>
        </Link>
        <Link to="/favoritos" className="nav-link  ">
          Favoritos<i className="fa-regular fa-thumbs-up ms-2"></i>
        </Link>
        <Link to="/carro" className="nav-link  ">
          Carro<i className="fa-solid fa-cart-arrow-down ms-2"></i>
        </Link>
        <Link to="/perfil" className="nav-link  ">
          Mi Perfil<i className="fa-regular fa-user ms-2"></i>
        </Link>
        <Link to="/login" onClick={logout} className="nav-link  ">
          Cerrar Sesión<i className="fa-solid fa-right-from-bracket ms-2"></i>
        </Link>
      </>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand logo">
          4Cylinders
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
