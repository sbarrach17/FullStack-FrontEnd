import React, { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import CardPublications from "../components/CardPublications";
import "../css/CardPublications.css";

const Publications = () => {
  const { products, getDeveloper, deleteProductById } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const maxProductsPerPage = 10;

  // Filter products by the current user's email
  const userProducts = products.filter((product) => product.email === getDeveloper?.email);

  // Render message if user is not authenticated or has no products
  if (!getDeveloper || userProducts.length === 0) {
    return (
      <div className="container-fluid p-5">
        {!getDeveloper ? (
          <h2 className="text-dark text-center mt-5">Inicia sesión para ver tus publicaciones.</h2>
        ) : (
          <h1 className="text-dark text-center mt-5">NO TIENES PUBLICACIONES</h1>
        )}
      </div>
    );
  }

  // Pagination logic
  const indexOfLastProduct = currentPage * maxProductsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - maxProductsPerPage;
  const sortedProducts = userProducts; // Assuming userProducts are already sorted as needed
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / maxProductsPerPage);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container-fluid p-5">
      <h2 className="text-dark">Mis Publicaciones {getDeveloper.email}</h2>
      <div className="row row-cols-auto d-flex justify-content-center">
        {currentProducts.map((product) => (
          <div key={product.id} className="col d-flex align-items-center flex-column">
            <CardPublications product={product} deleteProduct={() => deleteProductById(product.id)} />
          </div>
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="pagination mt-4 d-flex justify-content-center">
        <button
          className="btn btnPagination mb-4"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          &#60;&#60;
        </button>
        <button
          className="btn btnPagination mb-4"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#60;
        </button>
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            className={`btn btnPagination mb-4 ${currentPage === number + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(number + 1)}
          >
            {number + 1}
          </button>
        ))}
        <button
          className="btn btnPagination mb-4"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &#62;
        </button>
        <button
          className="btn btnPagination mb-4"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          &#62;&#62;
        </button>
      </div>
    </div>
  );
};

export default Publications;
