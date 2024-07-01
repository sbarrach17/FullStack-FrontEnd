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
  <>
            <div className="card">
                <div className="image-container">
                    <img className="" src={product.url} alt={product.marca} />
                    <div className="price">{formatCurrency(product.valor)}</div>
                </div>
                {isEditing ? (
                    <EditProduct product={product} onSave={() => setIsEditing(false)} />
                ) : (
                    <>
                        <div className="content">
                            <div className="brand">{product.marca}</div>
                            <div className="product-name">{product.modelo}</div>
                        </div>
                        <div className="button-container">
                            <Link to={`/editarProducto/${product.id}`} className="buy-button button">
                                Editar
                            </Link>
                            <button className="cart-button button" onClick={confirmDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>

                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
);
};

export default CardPublications;
