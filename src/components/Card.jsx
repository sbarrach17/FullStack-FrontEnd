import { Link } from "react-router-dom";

const Card = ({ product,view }) => {

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
  };

    return (
          <Link to={`/collection/${product.id}`}>
        <div className=" card-container col-sm-12 col-md-7 col-lg-12 ">
      <div className="card custom-card">
        <img src={product.url} className="card-img-top custom-card-img" alt={product.nombre} />
        <div className="card-body">
          <h5 className="card-title">{product.nombre}</h5>
          {/* <p className="card-text">{product.descripcion}</p> */}
         <p className='card-text'><strong>Precio:</strong> {formatCurrency(product.valor)}</p>
          {/* <div className="d-flex justify-content-between">
          {view === "catalog" && (
              <>
                <button className="btn btn-info" onClick={(e) => { e.preventDefault(); onAddToFavorites(item); }}>Favoritos</button>
                <button className="btn btn-success" onClick={(e) => { e.preventDefault(); addToCart(item); }}>Agregar al Carrito</button>
              </>
            )}
            {view === "favorites" && (
              <>
                <button className="btn btn-danger" onClick={(e) => { e.preventDefault(); onRemoveFromFavorites(item); }}>Eliminar de Favoritos</button>
                <button className="btn btn-success" onClick={(e) => { e.preventDefault(); addToCart(item); }}>Agregar al Carrito</button>
              </>
            )}
            {view === "cart" && (
              <>
                <button className="btn btn-danger" onClick={(e) => { e.preventDefault(); onRemoveFromCart(item); }}>Eliminar del Carrito</button>
              </>
            )}
          </div> */}
        </div>
      </div>
    </div></Link>
  );
};
    


export default Card