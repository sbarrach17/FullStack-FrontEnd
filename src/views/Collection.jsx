import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Collection = () => {
    const { products } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const maxProductsPerPage = 10;

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setSortedProducts([...products]);
        }, 1000);

        return () => clearTimeout(timer);
    }, [products]);

    useEffect(() => {
        let sortedArray = [...products];
        if (sortOption === "priceAsc") {
            sortedArray.sort((a, b) => a.valor - b.valor);
        } else if (sortOption === "priceDesc") {
            sortedArray.sort((a, b) => b.valor - a.valor);
        } else if (sortOption === "alphaAsc") {
            sortedArray.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (sortOption === "alphaDesc") {
            sortedArray.sort((a, b) => b.nombre.localeCompare(a.nombre));
        }
        setSortedProducts(sortedArray);
        setCurrentPage(1); // Reset to first page when sorting option changes
    }, [sortOption, products]);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    // Calculate products to display on current page
    const indexOfLastProduct = currentPage * maxProductsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - maxProductsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Function to change page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total pages
    const totalPages = Math.ceil(sortedProducts.length / maxProductsPerPage);

    return (
        <div className="container">
        <div className="selectCollection mb-3">
         
            <div className="form-group">
                <label htmlFor="sortSelect" className="form-label">Ordenar por:</label>
                <select id="sortSelect" className="form-select" value={sortOption} onChange={handleSortChange}>
                    <option value="">Seleccione...</option>
                    <option value="priceAsc">Precio: Menor a Mayor</option>
                    <option value="priceDesc">Precio: Mayor a Menor</option>
                    <option value="alphaAsc">Nombre: A-Z</option>
                    <option value="alphaDesc">Nombre: Z-A</option>
                </select>
            </div>
        </div>
        {loading ? (
            <div id="loadingScreen">
                <img
                    src="./img/banner.png"
                    alt="Imagen de Carga"
                    className="loading-image"
                />
                <div className="loading-message">
                    {/* Mensaje opcional al cargar catalogo */}
                </div>
                <div className="custom-spinner"></div>
            </div>
        ) : (
            <>
                <div className="row">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="col-sm-12 col-md-3 col-lg-4 g-3">
                            <Card product={product} />
                        </div>
                    ))}
                </div>
                <div className="pagination mt-4 d-flex justify-content-center">
                    <button
                        className="btn btn-outline-primary mb-4 "
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    >
                        Primera
                    </button>
                    <button
                        className="btn btn-outline-primary mb-4 "
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    {[...Array(totalPages).keys()].map((number) => (
                        <button
                            key={number + 1}
                            className={`btn btn-outline-primary mb-4  ${currentPage === number + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(number + 1)}
                        >
                            {number + 1}
                        </button>
                    ))}
                    <button
                        className="btn btn-outline-primary mb-4 "
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                    <button
                        className="btn btn-outline-primary mb-4 "
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        Última
                    </button>
                </div>
            </>
        )}
    </div>
);
};

export default Collection;