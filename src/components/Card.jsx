import { Link } from "react-router-dom";

const Card = ({ product, view }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(amount);
  };

  return (
    <Link to={`/collection/${product.id}`}>
      <div className=" card-container col-sm-12 col-md-7 col-lg-12 ">
        <div className="card custom-card">
          <img
            src={product.url}
            className="card-img-top custom-card-img"
            alt={product.nombre}
          />
          <div className="card-body">
            <h5 className="card-title">{product.nombre}</h5>
            <p className="card-text fs-5">
              <strong>Precio:</strong> {formatCurrency(product.valor)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
