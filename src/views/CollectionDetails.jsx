import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { GlobalContext } from "../contexts/GlobalContext";

const CollectionDetails = () => {
    const { id } = useParams();
    const { products, addFavorite, addToCart } = useContext(GlobalContext);
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return <div>PRODUCT NOT FOUND</div>;
    }

    const handleAddToCart = () => {
        Swal.fire({
            title: 'Cargando...',
            text: 'Agregando producto al carro',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
                addToCart(product);
                setTimeout(() => {
                    Swal.close();
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto agregado al carro',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }, 1000); // Simulate a delay
            }
        });
    };

    const handleAddToFavorites = () => {
        Swal.fire({
            title: 'Cargando...',
            text: 'Agregando producto a favoritos',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
                addFavorite(product.id)
                    .then(() => {
                        Swal.close();
                        Swal.fire({
                            icon: 'success',
                            title: 'Producto agregado a favoritos',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                    .catch((error) => {
                        Swal.close();
                        console.error("Error al agregar producto a favoritos:", error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error al agregar producto a favoritos'
                        });
                    });
            }
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(amount);
    };

    return (
        <section className="container-fluid fullScreen">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-md-6 col-lg-5 position-relative imgDetail">
                    <img className="img-fluid" src={product.url} alt={product.nombre} />
                </div>
                <div className="col-md-6 col-lg-4 product-detail">
                    <h2 className="text-uppercase">{product.nombre}</h2>
                    <p className="descDetail">{product.descripcion}</p>
                    <p className="descDetail">Publicado por: {product.email}</p>
                    <p className="valorDetail fs-2">{formatCurrency(product.valor)}</p>
                    <button className="btn btn-danger" onClick={handleAddToCart}>
                        Agregar a Carro
                    </button>
                    <button className="btn btn-outline-danger ms-2" onClick={handleAddToFavorites}>
                        Agregar a Favoritos
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CollectionDetails;
