import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import CardPublications from "../components/CardPublications";

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
                    <h2>Inicia sesión para ver tus publicaciones.</h2>
                ) : (
                    <p>No tienes publicaciones.</p>
                )}
            </div>
        );
    }

    return (
          <div className="container">
            <h2>Mis Publicaciones {getDeveloper.email}</h2>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {userProducts.map((product) => (
                    <CardPublications
                        key={product.id}
                        product={product}
                        deleteProduct={() => deleteProductById(product.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Publications;
