import React from 'react';
import Swal from 'sweetalert2';

const CardFavorites = ({ favorite, onDelete }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
    };

    const confirmDelete = () => {
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
                onDelete(favorite.producto_id); 
            }
        });
    };

    return (
        <div className="col-12 col-md-3 mb-3">
            <div className='card custom-card'>
                <img src={favorite.producto_url} className='card-img-top custom-card-img' alt={favorite.producto_nombre} />
                <div className='card-body'>
                    <h5 className='card-title'>{favorite.producto_nombre}</h5>
                    <p className='card-text'> <span>Publicado por: </span>{favorite.usuario_email}</p>
                    <p className='card-text'><strong>Precio:</strong> {formatCurrency(favorite.producto_valor)}</p>
                    <button className='btn btn-outline-danger' onClick={confirmDelete}>Eliminar</button>
                </div>
            </div>
        </div>
    );
};

export default CardFavorites;
