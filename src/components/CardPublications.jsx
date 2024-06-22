import React from 'react';
import Swal from 'sweetalert2'
import EditProduct from './EditProduct';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CardPublications = ({ product, deleteProduct }) => {
  const [isEditing, setIsEditing] = useState(false);

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
                deleteProduct();
            }
        });
    };

    const handleEditClick = () => {
      setIsEditing(!isEditing);
    };

  return (
    <div className="col-12 col-md-3 mb-3">
    <div className='card custom-card'>
      {isEditing ? (
        <EditProduct product={product} editProduct={EditProduct} />
      ) : (
        <>
          <img src={product.url} className='card-img-top custom-card-img-pub' alt={product.nombre} />
          <div className='card-body'>
            <h5 className='card-title'>{product.nombre}</h5>
            <p className='card-text'><strong>Precio:</strong> {formatCurrency(product.valor)}</p>
            <button className='btn btn-outline-danger' onClick={confirmDelete}>Eliminar</button>
            <Link to={`/editarProducto/${product.id}`}>
            <button className='btn btn-outline-primary' onClick={handleEditClick}>Editar</button>
            </Link>
          </div>
        </>
      )}
    </div>
  </div>
);
};

export default CardPublications;
