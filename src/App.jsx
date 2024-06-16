import "./App.css";
// import Context from "./contexts/Context";
// import useDeveloper from "./hooks/useDeveloper";
import { Routes, Route } from "react-router-dom";
// import { GlobalProvider } from "./contexts/GlobalContext";
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
import TestCartInsertion from "./views/TestCartInsertion";

const App = () => {
    // const globalState = useDeveloper()

    return (
        // <GlobalProvider>
            // <BrowserRouter>
            <section>
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
                    <Route path="/publicaciones" element={<Publications />} />
                    <Route path="/carro" element={<Cart />} />
                    <Route path="/favoritos" element={<Favorites />} />
                    <Route path="/prueba" element={<TestCartInsertion />} />
                </Routes>
                </section>
            // </BrowserRouter>
        // </GlobalProvider>
    );
};

export default App;
