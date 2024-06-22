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
        <div className="col-12 col-md-3 mb-3">
            <div className='card custom-card'>
            <Link to={`/collection/${favorite.producto_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className='card-body'>
                <img src={favorite.producto_url} className='card-img-top custom-card-img-fav' alt={favorite.producto_nombre} />
                    <h5 className='card-title mt-2'>{favorite.producto_nombre}</h5>
                    <p className='card-text'> <span>Publicado por: </span>{favorite.publicador_email}</p>
                    <p className='card-text'><strong>Precio:</strong> {formatCurrency(favorite.producto_valor)}</p>
        </div>
        </Link>
                <div className='card-body'>
                    <button onClick={confirmDelete} className="btn btn-danger">Eliminar</button>
                </div>
            </div>
        </div>  
    );
};

export default CardFavorites;

