import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import CardPublications from "../components/CardPublications";
import '../css/CardPublications.css'

const Publications = () => {
    const { products, getDeveloper, deleteProductById } =
        useContext(GlobalContext);

    // Filtrar las publicaciones por el correo electrónico del usuario actual
    const userProducts = products.filter(
        (product) => product.email === getDeveloper?.email
    );

    // Mostrar un mensaje si el usuario no está autenticado o no tiene publicaciones
    if (!getDeveloper || userProducts.length === 0) {
        return (
            <div>
                {!getDeveloper ? (
                    <h2 className="text-dark text-center mt-5">Inicia sesión para ver tus publicaciones.</h2>
                ) : (
                    <h1 className="text-dark text-center mt-5">NO TIENES PUBLICACIONES</h1>
                )}
            </div>
        );
    }

    return (
        <div className="container-fluid p-5">
        <h2>Mis Publicaciones {getDeveloper.email}</h2>
        <div className="row row-cols-auto d-flex justify-content-center ">
            {userProducts.map((product) => (
                <div key={product.id} className="col d-flex align-items-center flex-column" >
                    <CardPublications
                        product={product}
                        deleteProduct={() => deleteProductById(product.id)}
                    />
                </div>
            ))}
        </div>
    </div>
);
};

export default Publications;
