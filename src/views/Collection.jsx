import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Card from "../components/Card";
// import { Link } from "react-router-dom";
import "../css/Card.css";

const Collection = () => {
    const { products } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const maxProductsPerPage = 15;

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setSortedProducts([...products]);
        }, 2500);

        return () => clearTimeout(timer);
    }, [products]);

    useEffect(() => {
        let sortedArray = [...products];

        // Filter products based on search term for both marca and talla
        if (searchTerm) {
            sortedArray = sortedArray.filter(product =>
                product.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.talla.toLowerCase().includes(searchTerm.toLowerCase()) 
            );
        }



        if (sortOption === "priceAsc") {
            sortedArray.sort((a, b) => a.valor - b.valor);
        } else if (sortOption === "priceDesc") {
            sortedArray.sort((a, b) => b.valor - a.valor);
        } else if (sortOption === "alphaAsc") {
            sortedArray.sort((a, b) => a.marca.localeCompare(b.marca));
        } else if (sortOption === "alphaDesc") {
            sortedArray.sort((a, b) => b.marca.localeCompare(a.marca));
        }
        setSortedProducts(sortedArray);
        setCurrentPage(1); // Reset to first page when sorting option changes
    }, [sortOption,searchTerm, products]);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
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
        // <div className="d-flex flex-column align-items-center">
        <div>
            {loading ? (
               <div className="spinnerContainer">
               <div className="spinner"></div>
               <div className="loader">
                 <p>Cargando</p>
                 <div className="words">
                   <span className="word">...</span>
                   <span className="word">Imagenes</span>             
                   <span className="word">Post</span>
                 </div>
               </div>
             </div>
            ) : (
                <>
                <div className="selCollection mt-3">
                    <div>
                        {/* <label>Ordenar por:</label> */}
                        <select p name="" id="" className="boxSelect" value={sortOption} onChange={handleSortChange}>
                            <option value="" disabled>Ordenar por</option>
                            <option value="alphaAsc">Nombre A-Z</option>
                            <option value="alphaDesc">Nombre Z-A</option>
                            <option value="priceAsc">Precio Menor a Mayor</option>
                            <option value="priceDesc">Precio Mayor a Menor</option>
                        </select>
                        </div>
                        <div className="search-container">
                        
                            <input
                            id="placeholderCOLOR"
                                type="text"
                                placeholder=" Buscar... Marca, Talla"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className=" boxSelect  "
                            />
                        </div>
                    </div>
                    <div className="container-fluid p-5">
                    <div className="row row-cols-auto d-flex justify-content-center ">
                        {currentProducts.map((product) => (
                            <div key={product.id} className="col d-flex align-items-center flex-column">
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    </div>
              
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
                                className={`btn btnPagination mb-4 ${currentPage === number + 1 ? 'active' : ''}`}
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
                </>
            )}
        </div>
    );
};

export default Collection;
