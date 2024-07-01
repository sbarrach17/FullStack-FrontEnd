import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./views/Home";
import Registro from "./views/Register";
import Login from "./views/Login";
import Perfil from "./views/Profile";
import Collection from "./views/Collection";
import EditProfile from "./components/EditProfile";
import AddProduct from "./components/AddProduct";
import Publications from "./views/Publications";
import CollectionDetails from "./views/CollectionDetails";
import Cart from "./views/Cart";
import Favorites from "./views/Favorites";
import EditProduct from "./components/EditProduct";


const App = () => {
    return (
        <>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registrarse" element={<Registro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/collection/:id" element={<CollectionDetails />} />
                <Route path="/editarPerfil" element={<EditProfile />} />
                <Route path="/agregarProducto" element={<AddProduct />} />
                <Route
                    path="/editarProducto/:productId"
                    element={<EditProduct />}
                />
                <Route path="/publicaciones" element={<Publications />} />
                <Route path="/carro" element={<Cart />} />
                <Route path="/favoritos" element={<Favorites />} />
            </Routes>
        </>
    );
};

export default App;

