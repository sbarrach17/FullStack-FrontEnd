import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import Swal from "sweetalert2";
import '../css/AddProduct.css'

const AddProduct = () => {
  const { addProduct, getDeveloper } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    marca: "",
    modelo: "",
    talla: "",
    valor: "",
    url: "",
    descripcion: "",
    email: "", // Se llenará con el email del usuario logueado
    nombre_vendedor: "", // Se llenará con el nombre del usuario logueado
    apellido_vendedor: "", // Se llenará con el apellido del usuario logueado
  });

  useEffect(() => {
    if (getDeveloper && getDeveloper.email) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        email: getDeveloper.email,
        nombre_vendedor: getDeveloper.nombre,
        apellido_vendedor: getDeveloper.apellido,
      }));
    }
  }, [getDeveloper]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!getDeveloper || !getDeveloper.email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes iniciar sesión para agregar un producto",
      });
      return;
    }
    const { marca, descripcion, valor, url, talla, modelo } = product;
    if (!marca || !descripcion || !valor || !url || !talla || !modelo) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Por favor completa todos los campos",
      });
      return;
    }
    try {
      await addProduct(product);
      setProduct({
        marca: "",
        modelo: "",
        talla: "",
        valor: "",
        descripcion: "",
        url: "",
        email: getDeveloper.email,
        nombre_vendedor: getDeveloper.nombre,
        apellido_vendedor: getDeveloper.apellido,
      });

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Producto agregado exitosamente",
      });
      navigate("/publicaciones");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al agregar el producto",
      });
      console.error("Error al agregar producto:", error);
    }
  };

  const formatCurrency = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) return "";
    return number.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
  };

  return (
    <div className="containter-register">
      <div className="form-container">
        <p className="title">AGREGAR PRODUCTO</p>
        <form className="form" onSubmit={handleFormSubmit}>
          <div className="input-group">
            <label>Marca</label>
            <input type="text" name="marca" onChange={handleInputChange} value={product.marca} />
          </div>
          <div className="input-group">
            <label>Modelo</label>
            <input type="text" name="modelo" onChange={handleInputChange} value={product.modelo} maxLength="13" />
          </div>
          <div className="input-group">
            <label>Talla</label>
            <input type="text" name="talla" onChange={handleInputChange} value={product.talla} />
          </div>
          <div className="input-group">
            <label>Valor</label>
            <input 
              type="number" 
              name="valor" 
              onChange={handleInputChange} 
              value={product.valor} 
            />
            <span>{formatCurrency(product.valor)}</span>
          </div>
          <div className="input-group">
            <label>Imagen</label>
            <input type="text" name="url" onChange={handleInputChange} value={product.url} />
          </div>
          <div className="input-group">
            <label>Descripcion</label>
            <textarea name="descripcion" onChange={handleInputChange} value={product.descripcion} />
          </div>
          <button type="submit" className="sign mt-3">
            AGREGAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
