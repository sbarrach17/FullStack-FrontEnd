import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { GlobalContext } from '../contexts/GlobalContext';

const EditProduct = () => {
    const { productId } = useParams();
    const { products, editProduct } = useContext(GlobalContext);
    const [productData, setProductData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const product = products.find((prod) => prod.id === parseInt(productId));
        setProductData(product);
    }, [productId, products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'valor') {
            setProductData({ ...productData, [name]: parseFloat(value) });
        } else {
            setProductData({ ...productData, [name]: value });
        }
    };

    const validateForm = () => {
        if (!productData.nombre || !productData.descripcion || !productData.valor || !productData.url) {
            Swal.fire({
                title: 'Error',
                text: 'Todos los campos son obligatorios.',
                icon: 'error',
                showConfirmButton: true
            });
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        editProduct(productId, productData);
        Swal.fire({
            title: '¡Éxito!',
            text: 'El producto ha sido editado correctamente.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate('/publicaciones');
        });
    };

    if (!productData) return <div>Cargando Publicación...</div>;

    return (
        <form
            onSubmit={handleSubmit}
            className="col-10 col-sm-6 col-md-3 m-auto mt-5"
        >
            <h1>Editar Producto</h1>
            <hr />
            <div className="form-group mt-1">
                <label>Nombre </label>
                <input
                    value={productData.nombre}
                    onChange={handleChange}
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="Nombre del producto"
                />
            </div>
            <div className="form-group mt-1">
                <label>Descripción </label>
                <input
                    value={productData.descripcion}
                    onChange={handleChange}
                    type="text"
                    name="descripcion"
                    className="form-control"
                    placeholder="Descripción del producto"
                />
            </div>
            <div className="form-group mt-1">
                <label>Valor </label>
                <input
                    value={productData.valor}
                    onChange={handleChange}
                    type="number"
                    name="valor"
                    className="form-control"
                    placeholder="Valor del producto"
                />
                <small>{new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(productData.valor)}</small>
            </div>
            <div className="form-group mt-1">
                <label>Imagen </label>
                <input
                    value={productData.url}
                    onChange={handleChange}
                    type="text"
                    name="url"
                    className="form-control"
                    placeholder="URL de la imagen del producto"
                />
            </div>
         
            <button type="submit" className="btn btn-primary mt-3">
               Guardar Cambios
            </button>
        </form>
    );
};

export default EditProduct;
