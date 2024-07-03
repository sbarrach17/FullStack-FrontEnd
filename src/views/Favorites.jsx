import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ENDPOINT } from '../config/constans.js'
import { GlobalContext } from '../contexts/GlobalContext';
import CardFavorites from '../components/CardFavorites';
import "../css/CardFavorites.css";

const Favorites = () => {
    const { getDeveloper } = useContext(GlobalContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const maxProductsPerPage = 10;

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const token = window.sessionStorage.getItem("token");
                if (token && getDeveloper && getDeveloper.email) {
                    const response = await axios.get(ENDPOINT.getFavorites, {
                        params: { email: getDeveloper.email },
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setFavorites(response.data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
    
        if (getDeveloper && getDeveloper.email) {
            fetchFavorites();
        } else {
            setLoading(false);
        }
    }, [getDeveloper]);

    const handleDeleteFavorite = async (favoriteId) => {
        try {
            const token = window.sessionStorage.getItem("token");
            if (token) {
                await axios.delete(`${ENDPOINT.deleteFavorites}/${favoriteId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const updatedFavorites = favorites.filter(
                    (favorite) => favorite.favorito_id !== favoriteId
                );
                setFavorites(updatedFavorites);
                Swal.fire('¡Eliminado!', 'El favorito ha sido eliminado.', 'success');
            }
        } catch (error) {
            console.error("Error al eliminar favorito:", error);
            Swal.fire('¡Error!', 'Hubo un error al intentar eliminar el favorito.', 'error');
        }
    };

    // Filter favorites by user's email
    const userFavorites = favorites.filter(
        (favorite) => favorite.usuario_email === getDeveloper?.email
    );

    // Pagination logic
    const indexOfLastProduct = currentPage * maxProductsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - maxProductsPerPage;
    const currentFavorites = userFavorites.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(userFavorites.length / maxProductsPerPage);

    // Function to handle page changes
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='container-fluid'>
            <h1 className='text-center text-dark mt-4'>Mis Favoritos</h1>
            {loading && <p>Cargando Favoritos...</p>}
            {error && <p>Error: {error.message}</p>}
            <div className="row row-cols-auto d-flex justify-content-center">
                {currentFavorites.map(favorite => (
                    <div key={favorite.favorito_id} className="col d-flex align-items-center flex-column">
                        <CardFavorites 
                            favorite={favorite} 
                            deleteFavorite={() => handleDeleteFavorite(favorite.favorito_id)}
                        />
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

export default Favorites;