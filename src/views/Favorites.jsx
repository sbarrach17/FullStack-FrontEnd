import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../config/constans';
import { GlobalContext } from '../contexts/GlobalContext';
import CardFavorites from '../components/CardFavorites'

const Favorites = () => {
    const { getDeveloper } = useContext(GlobalContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

// ELIMINA DE MIS FAVORITOS
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
        }
    } catch (error) {
        console.error("Error al eliminar favorito:", error);
        throw error;
    }
};
    const userFavorites = favorites.filter(
        (favorite) => favorite.usuario_email === getDeveloper?.email
    );

    return (
        <div className='container'>
            <h1>Mis Favoritos</h1>
            {loading && <p>Cargando Favoritos...</p>}
            {error && <p>Error: {error.message}</p>}
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {userFavorites.map(favorite => (
                    <CardFavorites 
                        key={favorite.producto_id} 
                        favorite={favorite} 
                        deleteFavorite={() => handleDeleteFavorite(favorite.favorito_id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
