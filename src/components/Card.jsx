// import { Link } from "react-router-dom";

const Card = ({ product }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(amount);
  };

   // Verificar si el producto está reservado
   if (product.estado === 'reservado') {
    return null; // No renderizar la tarjeta si el producto está reservado
  }

  return (
    <>
      <div className="card">
        <div className="image-container">
          <img className="" src={product.url} alt={product.marca} />
          <div className="price">{formatCurrency(product.valor)}</div>
        </div>
        
        <div className="content">
          <div className="brand">{product.marca}</div>
          <div className="product-name">{product.modelo}</div>
          <div className="d-flex">
              <p className="text-white">Talla</p>
              <p className="text-white ms-2 text-uppercase" >{product.talla}</p>
        </div>
        </div>
       
        <div className="button-container">
          <a href={`/collection/${product.id}`} className="buy-button button">
            Más información
          </a>
        </div>
      </div>
    </>
  );
};

export default Card;
