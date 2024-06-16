import React from 'react';
import Swal from 'sweetalert2'

const CardPublications = ({ product, deleteProduct }) => {

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

  return (
    <div className="col-12 col-md-3 mb-3"> 
    <div className='card custom-card'>
      <img src={product.url} className='card-img-top custom-card-img' alt={product.nombre} />
      <div className='card-body'>
        <h5 className='card-title'>{product.nombre}</h5>
        {/* <p className='card-text'>{product.descripcion}</p> */}
        <p className='card-text'><strong>Precio:</strong> {formatCurrency(product.valor)}</p>
        <button className='btn btn-outline-danger' onClick={confirmDelete} >Eliminar</button>
      </div>
    </div>
  </div>
);
}

export default CardPublications;
