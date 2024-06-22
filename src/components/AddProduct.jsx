import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../contexts/GlobalContext";
import Swal from 'sweetalert2'

const AddProduct = () => {
    const { addProduct, getDeveloper } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        nombre: "",
        descripcion: "",
        valor: "",
        url: "",
        email: "", // Se llenará con el email del usuario logueado
    });

    useEffect(() => {
        if (getDeveloper && getDeveloper.email) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                email: getDeveloper.email,
            }));
        }
    }, [getDeveloper]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!getDeveloper || !getDeveloper.email) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes iniciar sesión para agregar un producto',
            });
            return;
        }
        const { nombre, descripcion, valor, url } = product;
        if (!nombre || !descripcion || !valor || !url) {

            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Por favor completa todos los campos',
            });
            return;
        }
        try {
            await addProduct(product);
            setProduct({
                nombre: "",
                descripcion: "",
                valor: "",
                url: "",
                email: getDeveloper.email,
            });

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Producto agregado exitosamente',
            });
            navigate('/publicaciones');
        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al agregar el producto',
            });
            console.error("Error al agregar producto:", error);
        }
    };
    return (
        <form
            onSubmit={handleFormSubmit}
            className="col-10 col-sm-6 col-md-3 m-auto mt-5"
        >
            <h1>Agregar Producto</h1>
            <hr />
            <div className="form-group mt-1">
                <label>Nombre </label>
                <input
                    value={product.nombre}
                    onChange={handleInputChange}
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="Nombre del producto"
                />
            </div>
            <div className="form-group mt-1">
                <label>Descripción </label>
                <input
                    value={product.descripcion}
                    onChange={handleInputChange}
                    type="text"
                    name="descripcion"
                    className="form-control"
                    placeholder="Descripción del producto"
                />
            </div>
            <div className="form-group mt-1">
                <label>Valor </label>
                <input
                    value={product.valor}
                    onChange={handleInputChange}
                    type="number"
                    name="valor"
                    className="form-control"
                    placeholder="Valor del producto"
                />
            </div>
            <div className="form-group mt-1">
                <label>Imagen </label>
                <input
                    value={product.url}
                    onChange={handleInputChange}
                    type="text"
                    name="url"
                    className="form-control"
                    placeholder="URL de la imagen del producto"
                />
            </div>
            {/* <div className="form-group mt-1">
                <label>Email</label>
                <input
                    value={product.email}
                    onChange={handleInputChange}
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email del usuario"
                />
            </div> */}
            <button type="submit" className="btn btn-primary mt-3">
                Agregar Producto
            </button>
        </form>
    );
};

export default AddProduct;
