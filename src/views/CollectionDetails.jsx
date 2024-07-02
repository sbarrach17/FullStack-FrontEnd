import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { GlobalContext } from "../contexts/GlobalContext";
import "../css/CollectionDetails.css";

const CollectionDetails = () => {
    const { id } = useParams();
    const { products, addFavorite, addToCart } = useContext(GlobalContext);
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return <div>PRODUCTO NO ENCONTRADO</div>;
    }

    const handleAddToCart = () => {
        Swal.fire({
            title: "Cargando...",
            text: "Agregando producto al carro",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
                addToCart(product);
                setTimeout(() => {
                    Swal.close();
                    Swal.fire({
                        icon: "success",
                        title: "Producto agregado al carro",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }, 1000); // Simulate a delay
            },
        });
    };

    const handleAddToFavorites = () => {
        Swal.fire({
            title: "Cargando...",
            text: "Agregando producto a favoritos",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
                addFavorite(product.id)
                    .then(() => {
                        Swal.close();
                        Swal.fire({
                            icon: "success",
                            title: "Producto agregado a favoritos",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch((error) => {
                        Swal.close();
                        console.error(
                            "Error al agregar producto a favoritos:",
                            error
                        );
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Error al agregar producto a favoritos",
                        });
                    });
            },
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
        }).format(amount);
    };

    return (
        <section className="container-fluid containerDetails p-3">
            <div className="row">
                <div className="imgContent">
                    <img
                        className="img-fluid imgCard"
                        src={product.url}
                        alt={product.marca}
                    />
                </div>
                <div className="content row row-cols-auto ">
                    <h1 className="titleCol">{product.marca}</h1>
                    <p className="textContent">{product.descripcion}</p>
                    <div className="textTalla">
                        <p className="text-start fs-6"> * Todos los productos tienen 30 días de garantía, desde su recepción.</p>
                       <hr />
                        <p className="text-start text-uppercase">TALLA {product.talla}</p>
                        <p className="text-start text-uppercase">VALOR { formatCurrency (product.valor)}</p>
                    </div>
                    {/* BOTON DE VENDEDOR */}
                    <div className="btnContact">
                    <button id="btn-message" className="button-message">
                        <div className="content-avatar">
                            <div className="avatar">
                                <svg
                                    className="user-img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="notice-content">
                            <div className="username">
                                {product.nombre_vendedor}{" "}
                                {product.apellido_vendedor}
                            </div>
                            <div className="lable-message">
                                Contacto Vendedor
                            </div>
                            <div className="user-id">{product.email}</div>
                        </div>
                    </button>
                    </div>
                    {/*BOTON DE VENDEDOR  */}
                    <div className="btn-group">
                        <button className="btnCol" onClick={handleAddToCart}>
                            Agregar a carro{" "}
                            <i
                                className="fa-solid fa-cart-arrow-down"
                                style={{ color: "white" }}
                            ></i>
                        </button>
                        <button
                            className="btnCol"
                            onClick={handleAddToFavorites}
                        >
                            Favoritos{" "}
                            <i
                                className="fa-solid fa-thumbs-up"
                                style={{ color: "white" }}
                            ></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CollectionDetails;
{
    /* DATOS DE CONTACTO */
}

{
    /* DATOS DE CONTACTO */
}
