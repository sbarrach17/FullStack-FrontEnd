import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../contexts/GlobalContext'; // Asegúrate de importar el contexto correctamente
import CardFavorites from '../components/CardFavorites';

const Favorites = () => {
    const { favorites, getFavorites, deleteFavById } = useContext(GlobalContext);

    useEffect(() => {
        getFavorites();
    }, []);

    const handleDeleteFavorite = async (productId) => {
        try {
            await deleteFavById(productId); // Llamar a la función para eliminar el producto favorito
        } catch (error) {
            console.error("Error al eliminar el producto favorito:", error);
        } finally {
            // Actualizar la lista de favoritos después de la eliminación
            getFavorites();
        }
    };

    return (
        <div className='container'>
            <h2 className='text-center'>Mis Favoritos</h2>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {favorites.length > 0 ? (
                    favorites.map(favorite => (
                        <CardFavorites
                            key={favorite.producto_id}
                            favorite={favorite}
                            onDelete={handleDeleteFavorite} 
                        />
                    ))
                ) : (
                    <p>No tienes productos favoritos aún.</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;