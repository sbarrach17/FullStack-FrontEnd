import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { validarRut } from "../utils/validarRut";
import "../css/Cart.css";

const Cart = () => {
  const { cartItems, removeItemFromCart, insertarAlCarro } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [totalValue, setTotalValue] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    numero: "",
    region: "",
    comuna: "",
    direccion: "",
    domicilio: "",
    departamento: "",
    metodoPago: "",
    titular: "",
    ntarjeta: "",
    expiracion: "",
    cvv: "",
  });

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.valor;
    });
    setTotalValue(total);
  }, [cartItems]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(amount);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "rut") {
      setFormData({
        ...formData,
        [name]: formatoRut(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleremoveItemFromCart = (product) => {
    Swal.fire({
      title: "Cargando...",
      text: "Eliminando producto del carro",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        removeItemFromCart(product);
        setTimeout(() => {
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "Producto eliminado de carro",
            showConfirmButton: false,
            timer: 1000,
          });
        }, 1000); // Simulate a delay
      },
    });
  };

  const formatoRut = (rut) => {
    rut = rut.replace(/[^\dkK.-]/g, ""); // Eliminar caracteres no válidos
    let cleanedRut = rut.replace(/[^0-9kK]/g, ""); // Quitar todo excepto números y K
    if (cleanedRut.length > 1) {
      cleanedRut =
        cleanedRut.substring(0, cleanedRut.length - 1) +
        "-" +
        cleanedRut.substring(cleanedRut.length - 1);
    }
    return cleanedRut;
  };

  const validateFields = () => {
    const {
      nombre,
      apellido,
      rut,
      email,
      numero,
      region,
      comuna,
      direccion,
      domicilio,
      metodoPago,
      titular,
      ntarjeta,
      expiracion,
      cvv,
    } = formData;

    if (!nombre) {
      showError("Nombre");
      return false;
    }
    if (!apellido) {
      showError("Apellido");
      return false;
    }
    if (!rut) {
      showError("Rut");
      return false;
    }
    if (!email) {
      showError("Email");
      return false;
    }
    if (!numero) {
      showError("Número");
      return false;
    }
    if (!region) {
      showError("Región");
      return false;
    }
    if (!comuna) {
      showError("Comuna");
      return false;
    }
    if (!direccion) {
      showError("Dirección");
      return false;
    }
    if (!domicilio) {
      showError("Domicilio");
      return false;
    }
    if (!metodoPago) {
      showError("Método de Pago");
      return false;
    }
    if (!titular) {
      showError("Nombre Titular");
      return false;
    }
    if (!ntarjeta) {
      showError("Numero de Tarjeta");
      return false;
    }
    if (!expiracion) {
      showError("Fecha expiracion");
      return false;
    }
    if (!cvv) {
      showError("CVV");
      return false;
    }
    if (!validarRut(rut)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El RUT ingresado no es válido.",
      });
      return false;
    }
    return true;
  };

  const showError = (campo) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: `Por favor complete el campo ${campo}.`,
    });
  };

  // const handleInsertItem = async (productId) => {
  //     if (!validateFields()) {
  //         return;
  //     }

  //     try {
  //         const result = await Swal.fire({
  //             title: "¿Está seguro?",
  //             text: "Se enviará la información al correo proporcionado para realizar la compra.",
  //             icon: "warning",
  //             showCancelButton: true,
  //             confirmButtonText: "Sí, confirmar",
  //             cancelButtonText: "Cancelar",
  //         });

  //         if (result.isConfirmed) {
  //             const itemToAdd = {
  //                 ...formData,
  //                 producto_id: productId,
  //             };
  //             await insertarAlCarro(itemToAdd);
  //             Swal.fire({
  //                 icon: "success",
  //                 title: "Compra confirmada",
  //                 text: `La información se ha enviado al correo: ${formData.email}`,
  //             });
  //             setFormData({
  //                 nombre: "",
  //                 apellido: "",
  //                 rut: "",
  //                 email: "",
  //                 numero: "",
  //                 region: "",
  //                 comuna: "",
  //                 direccion: "",
  //                 domicilio: "",
  //                 departamento: "",
  //                 metodoPago: "",
  //                 titular: "",
  //                 ntarjeta: "",
  //                 expiracion: "",
  //                 cvv: "",
  //             });
  //             setTotalValue(0);
  //             removeItemFromCart(productId);
  //             navigate("/collection");
  //         }
  //     } catch (error) {
  //         console.error("Error al insertar ítem en el carrito:", error);
  //         Swal.fire({
  //             icon: "error",
  //             title: "Error",
  //             text: "Error al insertar ítem en el carrito.",
  //         });
  //     }
  // };

  const handleInsertItem = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const result = await Swal.fire({
        title: "¿Está seguro?",
        text: "Se enviará la información al correo proporcionado para realizar la compra.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, confirmar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const itemsToAdd = cartItems.map((item) => ({
          ...formData,
          producto_id: item.id,
        }));

        await Promise.all(
          itemsToAdd.map((itemToAdd) => insertarAlCarro(itemToAdd))
        );

        Swal.fire({
          icon: "success",
          title: "Compra confirmada",
          text: `La información se ha enviado al correo: ${formData.email}`,
        });

        setFormData({
          nombre: "",
          apellido: "",
          rut: "",
          email: "",
          numero: "",
          region: "",
          comuna: "",
          direccion: "",
          domicilio: "",
          departamento: "",
          metodoPago: "",
          titular: "",
          ntarjeta: "",
          expiracion: "",
          cvv: "",
        });

        setTotalValue(0);
        removeItemFromCart(); // Función para limpiar el carrito, si está disponible en tu contexto
        navigate("/collection");
      }
    } catch (error) {
      console.error("Error al insertar ítem en el carrito:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al insertar ítem en el carrito.",
      });
    }
  };

  useEffect(() => {
    $(document).ready(function () {
      $("#smartwizard").smartWizard({
        selected: currentStep,
        theme: "arrows",
        transitionEffect: "slide-horizontal",
        justified: true,
        autoAdjustHeight: true,
        toolbarSettings: {
          toolbarPosition: "bottom",
          toolbarButtonPosition: "right",
          showNextButton: true,
          showPreviousButton: true,
        },
        anchorSettings: {
          markDoneStep: true,
          markAllPreviousStepsAsDone: true,
          removeDoneStepOnNavigateBack: true,
          enableAnchorOnDoneStep: true,
        },
        lang: {
          next: "Siguiente",
          previous: "Anterior",
        },
        onLeaveStep: function (fromStep, toStep, context) {
          if (fromStep < toStep) {
            return validateFields();
          }
          return true;
        },
        onShowStep: function (stepObj, context) {
          setCurrentStep(stepObj.index);
        },
      });
    });
  }, [currentStep]);

  return (
    <div>
      {cartItems.length === 0 ? (
        <h1 className="text-dark">No hay productos en el carro.</h1>
      ) : (
        <div id="smartwizard">
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link" href="#step-1">
                <div className="num">1</div>
                CONTACTO
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#step-2">
                <span className="num">2</span>
                DESPACHO
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#step-3">
                <span className="num">3</span>
                PAGO
              </a>
            </li>
            {/* <li className="nav-item">
                        <a className="nav-link" href="#step-4">
                            <span className="num">4</span>
                            RESUMEN
                        </a>
                    </li> */}
          </ul>
          <div className="tab-content">
            {/* STEP 1: CONTACTO */}
            <div
              id="step-1"
              className="tab-pane"
              role="tabpanel"
              aria-labelledby="step-1"
            >
              <div className="text-center">
                <h3>Información de contacto</h3>
              </div>
              <div className="row row-cols-auto d-flex justify-content-center">
                <div className="col-sm-12 col-md-6 col-lg-5">
                  <div className="inputCart form-group">
                    <label>
                      Nombre <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className=" form-control"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-5">
                  <div className="inputCart form-group">
                    <label>
                      Apellido <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className=" form-control"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row row-cols-auto d-flex justify-content-center">
                <div className="col-sm-12 col-md-6 col-lg-5">
                  <div className="inputCart form-group">
                    <label>
                      Rut <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="rut"
                      value={formData.rut}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-5">
                  <div className="inputCart form-group">
                    <label>
                      Email <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row row-cols-auto d-flex justify-content-center">
                <div className="col-sm-12 col-md-6 col-lg-10">
                  <div className="inputCart form-group">
                    <label>
                      Número de Contacto <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      maxLength="10"
                      className="form-control"
                      name="numero"
                      value={formData.numero}
                      onChange={handleInputChange}
                    />
                    <span className="text-dark">incluir +56</span>
                  </div>
                </div>
              </div>
            </div>
            {/* STEP 2: DESPACHO */}
            <div
              id="step-2"
              className="tab-pane"
              role="tabpanel"
              aria-labelledby="step-2"
            >
              <div className="col-12">
                <h3>Información de despacho</h3>
              </div>
              <div className="row row-cols-auto d-flex justify-content-center">
                <div className="col-sm-12 col-md-6 col-lg-5">
                  <div className="inputCart form-group">
                    <label>
                      Región <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                    >
                      <option value="">Seleccione una región</option>
                      <option value="Arica y Parinacota">
                        Arica y Parinacota
                      </option>
                      <option value="Tarapacá">Tarapacá</option>
                      <option value="Antofagasta">Antofagasta</option>
                      <option value="Atacama">Atacama</option>
                      <option value="Coquimbo">Coquimbo</option>
                      <option value="Valparaíso">Valparaíso</option>
                      <option value="Metropolitana de Santiago">
                        Metropolitana de Santiago
                      </option>
                      <option value="Libertador General Bernardo O'Higgins">
                        Libertador General Bernardo O'Higgins
                      </option>
                      <option value="Maule">Maule</option>
                      <option value="Ñuble">Ñuble</option>
                      <option value="Biobío">Biobío</option>
                      <option value="La Araucanía">La Araucanía</option>
                      <option value="Los Ríos">Los Ríos</option>
                      <option value="Los Lagos">Los Lagos</option>
                      <option value="Aysén del General Carlos Ibáñez del Campo">
                        Aysén del General Carlos Ibáñez del Campo
                      </option>
                      <option value="Magallanes y de la Antártica Chilena">
                        Magallanes y de la Antártica Chilena
                      </option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-5">
                  <div className="inputCart form-group">
                    <label>
                      Comuna <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="comuna"
                      value={formData.comuna}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row row-cols-auto d-flex justify-content-center">
                <div className="col-sm-12 col-md-6 col-lg-5">
                  <div className="inputCart form-group">
                    <label>
                      Dirección <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-5">
                  <div className="inputCart form-group">
                    <label>
                      Domicilio <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="domicilio"
                      value={formData.domicilio}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row row-cols-auto d-flex justify-content-center">
                <div className="col-sm-12 col-md-6 col-lg-10">
                  <div className="inputCart form-group">
                    <label>
                      Departamento <span style={{ color: "red" }}>( )</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="departamento"
                      value={formData.departamento}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* STEP 3 Resumen */}
            <div
              id="step-3"
              className="tab-pane"
              role="tabpanel"
              aria-labelledby="step-3"
            >
              <section>
                <div className="row">
                  <div className="col-sm-12 col-md-5 col-lg-6 mb-4">
                    <div className="cars mb-4">
                      <div className="card-body">
                        <form>
                          <div className="row mb-4"></div>
                          <h5 className="mb-4">METODO DE PAGO</h5>
                          <div className="form-check col-sm-12 col-md-5 mb-4 align-items-center">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="metodoPago"
                              id="checkoutForm3"
                              value="Tajeta Credito"
                              onChange={handleInputChange}
                              checked={
                                formData.metodoPago === "Tarjeta de Débito"
                              }
                            />
                            <label
                              className="form-check-labels"
                              htmlFor="checkoutForm3"
                            >
                              Tarjeta Credito
                            </label>
                            <div>
                              <img
                                className="iconPayment"
                                src="https://logowik.com/content/uploads/images/visa-payment-card1873.jpg"
                                alt=""
                              />
                              <img
                                className="iconPayment"
                                src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="form-check col-sm-12 col-md-5 mb-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="metodoPago"
                              id="checkoutForm4"
                              value="Tarjeta Débito"
                              onChange={handleInputChange}
                              checked={
                                formData.metodoPago === "Tarjeta de Débito"
                              }
                            />
                            <label
                              className="form-check-labels"
                              htmlFor="checkoutForm4"
                            >
                              Tarjeta Débito
                            </label>
                            <div>
                              <img
                                className="iconPayment"
                                src="https://logowik.com/content/uploads/images/visa-payment-card1873.jpg"
                                alt=""
                              />
                              <img
                                className="iconPayment"
                                src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="row mb-4">
                            <div className="col">
                              <div data-mdb-input-init className="form-outline">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="titular"
                                  value={formData.titular}
                                  onChange={handleInputChange}
                                />
                                <label className="form-label">
                                  Nombre Titular
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div data-mdb-input-init className="form-outline">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="ntarjeta"
                                  value={formData.ntarjeta}
                                  onChange={handleInputChange}
                                />
                                <label className="form-label">
                                  Número Tarjeta
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-4">
                            <div className="col-3">
                              <div data-mdb-input-init className="form-outline">
                                <input
                                  type="text"
                                  i
                                  className="form-control"
                                  name="expiracion"
                                  value={formData.expiracion}
                                  onChange={handleInputChange}
                                />
                                <label className="form-label">
                                  Fecha Expiración
                                </label>
                              </div>
                            </div>
                            <div className="col-3">
                              <div data-mdb-input-init className="form-outline">
                                <input
                                  type="password"
                                  className="form-control"
                                  maxLength="3"
                                  name="cvv"
                                  value={formData.cvv}
                                  onChange={handleInputChange}
                                />
                                <label className="form-label">CVV</label>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4 bg-white">
                    <div className="cars mb-4">
                      <div className="card-header py-3">
                        <h5 className="mb-0">Detalles Pedido</h5>
                      </div>
                      <div className="card-body">
                        {cartItems.map((item) => (
                          <div key={item.id}>
                            <div className="d-flex justify-content-center">
                              <img
                                className=""
                                src={item.url}
                                alt={item.marca}
                                style={{ maxWidth: "100px", height: "auto" }}
                              />
                            </div>
                            <ul className="list-group list-group-flush bgf">
                              <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                {item.marca}
                                <span>{item.modelo}</span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                Valor
                                <span>{formatCurrency(item.valor)}</span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                Despacho
                                <span>Gratis</span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                <div>
                                  <strong>Monto Total</strong>
                                  <strong>
                                    <p className="mb-0">(IVA Incluido)</p>
                                  </strong>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      handleremoveItemFromCart(item.id)
                                    }
                                  >
                                    Eliminar
                                  </button>{" "}
                                </div>
                                <span>
                                  <strong>{formatCurrency(item.valor)}</strong>
                                </span>
                              </li>
                            </ul>
                          </div>
                        ))}
                        <h3>Total: {formatCurrency(totalValue)}</h3>
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handleInsertItem(cartItems.map((item) => item.id))
                          }
                        >
                          Confirmar Compra
                        </button>

                        {/* <button
                                    className="btn btn-success"
                                    onClick={() =>
                                        handleInsertItem(cartItems[0].id)
                                    }
                                >
                                    Confirmar Compra
                                </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>{" "}
          </div>

          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "0%" }}
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
