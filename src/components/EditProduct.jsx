import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { GlobalContext } from '../contexts/GlobalContext';
import '../css/EditProduct.css'

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
        if (!productData.marca || !productData.modelo || !productData.talla || !productData.valor || !productData.url || !productData.descripcion) {
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
        <div className="containter-register">
        <div className="form-container">
	<p className="title">EDITAR PRODUCTO</p>
	<form className="form" onSubmit={handleSubmit}>
		<div className="input-group">
			<label >Marca</label>
			<input type="text" name="marca" onChange={handleChange}  value={productData.marca}/>
		</div>
		<div className="input-group">
			<label >Modelo</label>
			<input type="text" name="modelo" onChange={handleChange}  value={productData.modelo} />
		</div>
		<div className="input-group">
			<label >Talla</label>
			<input type="text" name="talla" onChange={handleChange}  value={productData.talla}/>
		</div>
			<div className="input-group">
			<label >Valor</label>
			<input type="number" name="valor" onChange={handleChange}  value={productData.valor}/>
		</div>
        <div className="input-group">
			<label >Imagen</label>
			<input type="text" name="url" onChange={handleChange}  value={productData.url}/>
		</div>
        <div className="input-group">
            <label>Descripcion</label>
            <textarea type="text" name="descripcion" onChange={handleChange} value={productData.descripcion} />
          </div>
        <button type="submit" className="sign mt-3">
          EDITAR
        </button>
	</form>
	<div className="social-message">
		<div className="line"></div>
		<p className="message"></p>
		<div className="line"></div>
	</div>
	<div className="social-icons">
	
	
	
	</div>
	
</div>
    </div>
    );
};

export default EditProduct;
