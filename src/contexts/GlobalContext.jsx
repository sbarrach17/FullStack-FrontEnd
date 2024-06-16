import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINT } from "../config/constans";
import useDeveloper from "../hooks/useDeveloper";
import Context from "./Context";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const { getDeveloper, setDeveloper } = useDeveloper();
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [editUserError, setEditUserError] = useState(null);
    const [addProductError, setAddProductError] = useState(null);
    const [addCarError, setAddCarError] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    const removeItemFromCart = (productId) => {
        const updatedCart = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCart);
    };

    // OBTENER DATOS USUARIOS
    const getDeveloperData = () => {
        const token = window.sessionStorage.getItem("token");
        if (token) {
            axios
                .get(ENDPOINT.users, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(({ data: [user] }) => setDeveloper({ ...user }))
                .catch(() => {
                    window.sessionStorage.removeItem("token");
                    setDeveloper(null);
                });
        } else {
            setDeveloper(null);
        }
    };

    useEffect(() => {
        getDeveloperData();
    }, [setDeveloper]);

    // OBTENER CATALGO
    const getProductData = async () => {
        try {
            const response = await axios.get(ENDPOINT.product);
            setProducts(response.data);
        } catch (error) {
            console.error("Error al obtener datos de productos:", error);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    // Función para editar usuarios
    const editUser = async (userData) => {
        try {
            const token = window.sessionStorage.getItem("token");
            if (token) {
                await axios.put(ENDPOINT.editUser, userData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEditUserError(null);
            }
        } catch (error) {
            // Manejar errores al editar usuarios
            setEditUserError(error);
            console.error("Error al editar usuario:", error);
        }
    };

    // Función para agregar productos
    const addProduct = async (productData) => {
        try {
            const token = window.sessionStorage.getItem("token");
            if (token) {
                await axios.post(ENDPOINT.newProduct, productData, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setAddProductError(null);
                getProductData();
            }
        } catch (error) {
            // Manejar errores al agregar productos
            setAddProductError(error);
            console.error("Error al agregar producto:", error);
        }
    };

    // Función para obtener productos por correo electrónico
    const getProductByEmail = async (email) => {
        try {
            const token = window.sessionStorage.getItem("token");
            if (token) {
                const response = await axios.get(
                    `${ENDPOINT.getProductEmail}?email=${email}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                return response.data;
            }
        } catch (error) {
            console.error(
                "Error al obtener productos por correo electrónico:",
                error
            );
            throw error;
        }
    };

    const deleteProductById = async (productId) => {
        try {
            const token = window.sessionStorage.getItem("token");
            if (token) {
                await axios.delete(`${ENDPOINT.product}/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const updatedProducts = products.filter(
                    (product) => product.id !== productId
                );
                setProducts(updatedProducts);
            }
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            throw error;
        }
    };

    const addFavorite = async (productId) => {
        try {
            const token = window.sessionStorage.getItem("token");
            if (token) {
                await axios.post(
                    ENDPOINT.addFavorites,
                    { productoId: productId },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                // Actualizar el estado de productos para reflejar el cambio
                getProductData();
            }
        } catch (error) {
            console.error("Error al agregar producto a favoritos:", error);
            throw error;
        }
    };

    const getFavorites = async (email) => {
        try {
            const token = window.sessionStorage.getItem("token");
            if (token) {
                const response = await axios.get(
                    `${ENDPOINT.getFavorites}?email=${email}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setFavorites(response.data);
            }
        } catch (error) {
            console.error("Error al obtener favoritos:", error);
            throw error;
        }
    };

    const deleteFavById = async (productId) => {
        try {
            const token = window.sessionStorage.getItem("token");
            if (token) {
                await axios.delete(`${ENDPOINT.deleteFavorites}/${productId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Actualizar la lista de favoritos después de la eliminación
                const updatedFavorites = favorites.filter(
                    (favorite) => favorite.producto_id !== productId
                );
                setFavorites(updatedFavorites);
            }
        } catch (error) {
            console.error("Error al eliminar producto favorito:", error);
            throw error;
        }
    };

    const insertarAlCarro = async (carroItem) => {
        try {
            const token = window.sessionStorage.getItem("token");
            if (token) {
                const response = await axios.post(
                    ENDPOINT.insertCart,
                    carroItem,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                console.log(response.data); // Mensaje de éxito desde el servidor
            }
        } catch (error) {
            console.error(
                "Error al insertar ítem en el carro desde React:",
                error
            );
            if (error.response) {
                // Error de respuesta del servidor (status code fuera de 2xx)
                console.error("Status:", error.response.status);
                console.error("Data:", error.response.data);
            } else if (error.request) {
                // Error de solicitud (no se recibió respuesta del servidor)
                console.error(
                    "No se recibió respuesta del servidor:",
                    error.request
                );
            } else {
                // Otro tipo de error
                console.error("Error inesperado:", error.message);
            }
            throw error;
        }
    };

    const login = async (user, navigate) => {
        try {
            const { data } = await axios.post(ENDPOINT.login, user);
            console.log("Token del usuario:", data.token);
            console.log("Datos del usuario:", data);
            window.sessionStorage.setItem("token", data.token);
            setDeveloper({});
            navigate("/collection");
        } catch (error) {
            const {
                response: { data },
            } = error;
            console.error(data);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: data.message,
            });
            throw error;
        }
    };

    const registerUser = async (userData) => {
        try {
            const { data } = await axios.post(ENDPOINT.users, userData);
            setDeveloper(data); // Assuming the response from the backend contains the user data
            return data; // Optionally return data if needed in the component
        } catch (error) {
            throw error.response.data; // Throw error to handle in the component
        }
    };
    return (
        <GlobalContext.Provider
            value={{
                getDeveloper,
                setDeveloper,
                products,
                setProducts,
                favorites,
                editUser,
                editUserError,
                addProduct,
                addProductError,
                getProductByEmail,
                deleteProductById,
                addFavorite,
                getFavorites,
                deleteFavById,
                addCarError,
                addToCart,
                cartItems,
                removeItemFromCart,
                insertarAlCarro,
                login,
                registerUser,
            }}
        >
            <Context.Provider
                value={{
                    getDeveloper,
                    setDeveloper,
                    products,
                    setProducts,
                    favorites,
                    editUser,
                    editUserError,
                    addProduct,
                    addProductError,
                    getProductByEmail,
                    deleteProductById,
                    addFavorite,
                    getFavorites,
                    deleteFavById,
                    addCarError,
                    addToCart,
                    cartItems,
                    removeItemFromCart,
                    insertarAlCarro,
                    login,
                    registerUser,
                }}
            >
                {children}
            </Context.Provider>
        </GlobalContext.Provider>
    );
};
