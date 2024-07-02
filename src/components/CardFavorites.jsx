import React from 'react';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

const CardFavorites = ({ favorite, deleteFavorite,  }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
    };

    const confirmDelete = (event) => {
        event.stopPropagation(); 
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFavorite(); 
            }
        });
    };

    return (
  
        <div className="card">
        <div className="image-container">
          <img className="" src={favorite.producto_url} alt={favorite.producto_marca} />

          <div className="price">{formatCurrency(favorite.producto_valor)}</div>
        </div>

        <div className="content">
          <div className="brand">{favorite.producto_marca}</div>
          <div className="product-name">{favorite.producto_modelo}</div>
          {/* <div className="color-size-container">
            <div className="sizes">Vendedor {favorite.vendedor_email}</div>
            <p>{favorite.vendedor_email}</p>
          </div> */}
          <p className='text-white'>TALLA {favorite.producto_talla}</p>
        </div>

        <div className="button-container">
          <Link to={`/collection/${favorite.producto_id}`} className="buy-button button">Mas información</Link>        
          <button className="cart-button button" onClick={confirmDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
          </button>
        </div>
      </div>
    
    );
  };

export default CardFavorites;

// {formatCurrency(favorite.producto_valor)}
// {favorite.producto_nombre}
// {favorite.producto_url}