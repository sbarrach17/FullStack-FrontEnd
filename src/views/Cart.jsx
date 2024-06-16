import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Swal from "sweetalert2";

const Cart = () => {
    const { cartItems, removeItemFromCart, insertarAlCarro } =
        useContext(GlobalContext);
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
    });

    // Calcula el total del carrito cuando cambian los items
    useState(() => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.valor;
        });
        setTotalValue(total);
    }, [cartItems]);

    // Función para formatear valores a moneda
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
        }).format(amount);
    };

    // Maneja el cambio de inputs en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

      // Handle the insertion of the item in the cart
      const handleInsertItem = async (productId) => {
        try {
            const result = await Swal.fire({
                title: '¿Está seguro?',
                text: "Se enviará la información al correo proporcionado para realizar la compra.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, confirmar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                const itemToAdd = {
                    ...formData,
                    producto_id: productId,
                };
                await insertarAlCarro(itemToAdd);
                Swal.fire({
                    icon: 'success',
                    title: 'Compra confirmada',
                    text: `La información se ha enviado al correo: ${formData.email}`
                });
                // Clear the form after successful insertion
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
                });
                setTotalValue(0); // Reset totalValue if necessary
            }
        } catch (error) {
            console.error("Error al insertar ítem en el carrito:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al insertar ítem en el carrito.'
            });
        }
    };

    useEffect(() => {
        // Initialize SmartWizard when component mounts
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
                // Event fired when user goes to next/previous tab
                onLeaveStep: function (toStep, fromStep) {
                    setCurrentStep(toStep); // Update currentStep state
                    return validateSteps(fromStep); // Return true/false based on validation
                },
            });
            function validateSteps(step) {
                // Example validation logic based on step
                if (step === 0) {
                    // Validation for step 1 (contact information)
                    // Implement your validation logic here
                    return true; // Return true if validation passes
                } else if (step === 1) {
                    // Validation for step 2 (shipping information)
                    // Implement your validation logic here
                    return true; // Return true if validation passes
                }
                // Add more conditions for additional steps if needed
                return true; // Default to true if no specific validation required
            }
        });
    }, [currentStep]); // Only re-run effect if currentStep changes
    // Renderiza el componente

    return (
        <div className="mt-4">
            <div id="smartwizard" className="container-fluid">
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
                    <li className="nav-item">
                        <a className="nav-link" href="#step-4">
                            <span className="num">3</span>
                            RESUMEN
                        </a>
                    </li>
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
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-12 col-md-6 col-lg-5">
                                <div className="form-group">
                                    <label>
                                        Nombre{" "}
                                        <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="inputCart form-control"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-5">
                                <div className="form-group">
                                    <label>
                                        Apellido{" "}
                                        <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="inputCart form-control"
                                        name="apellido"
                                        value={formData.apellido}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-12 col-md-6 col-lg-5">
                                <div className="form-group">
                                    <label>
                                        Rut{" "}
                                        <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="inputCart form-control"
                                        name="rut"
                                        value={formData.rut}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-5">
                                <div className="form-group">
                                    <label>
                                        Email{" "}
                                        <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="inputCart form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-12 col-md-6 col-lg-10">
                                <div className="form-group">
                                    <label>
                                        Número de Contacto{" "}
                                        <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="inputCart form-control"
                                        name="numero"
                                        value={formData.numero}
                                        onChange={handleInputChange}
                                    />
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
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-12 col-md-6 col-lg-5">
                                <div className="inputCart form-group">
                                    <label>
                                        Región{" "}
                                        <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <select
                                        className="form-control"
                                        name="region"
                                        value={formData.region}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">
                                            Seleccione una región
                                        </option>
                                        <option value="Arica y Parinacota">
                                            Arica y Parinacota
                                        </option>
                                        <option value="Tarapacá">
                                            Tarapacá
                                        </option>
                                        <option value="Antofagasta">
                                            Antofagasta
                                        </option>
                                        <option value="Atacama">Atacama</option>
                                        <option value="Coquimbo">
                                            Coquimbo
                                        </option>
                                        <option value="Valparaíso">
                                            Valparaíso
                                        </option>
                                        <option value="Metropolitana de Santiago">
                                            Metropolitana de Santiago
                                        </option>
                                        <option value="Libertador General Bernardo O'Higgins">
                                            Libertador General Bernardo
                                            O'Higgins
                                        </option>
                                        <option value="Maule">Maule</option>
                                        <option value="Ñuble">Ñuble</option>
                                        <option value="Biobío">Biobío</option>
                                        <option value="La Araucanía">
                                            La Araucanía
                                        </option>
                                        <option value="Los Ríos">
                                            Los Ríos
                                        </option>
                                        <option value="Los Lagos">
                                            Los Lagos
                                        </option>
                                        <option value="Aysén del General Carlos Ibáñez del Campo">
                                            Aysén del General Carlos Ibáñez del
                                            Campo
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
                                        Comuna{" "}
                                        <span style={{ color: "red" }}>*</span>
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
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-12 col-md-6 col-lg-5">
                                <div className="inputCart form-group">
                                    <label>
                                        Dirección{" "}
                                        <span style={{ color: "red" }}>*</span>
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
                                        Domicilio{" "}
                                        <span style={{ color: "red" }}>*</span>
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
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-12 col-md-6 col-lg-10">
                                <div className="inputCart form-group">
                                    <label>Departamento (Opcional)</label>
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
                    {/* STEP 3: PAGO */}
                    <div id="step-3" className="tab-pane" role="tabpanel" aria-labelledby="step-3">
  <div className="col-md-12">
    <h4>Método de Pago</h4>
  </div>
  <div className="row d-flex justify-content-center">
    <div className="col-sm-12 col-md-6 col-lg-5">
      <div className="form-group">
        <label>Seleccione el método de pago <span style={{ color: "red" }}>*</span></label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="metodoPago"
            id="tarjetaCredito"
            value="Tarjeta de Crédito"
            checked={formData.metodoPago === "Tarjeta de Crédito"}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="tarjetaCredito">
            Tarjeta de Crédito
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="metodoPago"
            id="tarjetaDebito"
            value="Tarjeta de Débito"
            checked={formData.metodoPago === "Tarjeta de Débito"}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="tarjetaDebito">
            Tarjeta de Débito
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="metodoPago"
            id="paypal"
            value="PayPal"
            checked={formData.metodoPago === "PayPal"}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="paypal">
            PayPal
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="metodoPago"
            id="transferenciaBancaria"
            value="Transferencia Bancaria"
            checked={formData.metodoPago === "Transferencia Bancaria"}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="transferenciaBancaria">
            Transferencia Bancaria
          </label>
        </div>
      </div>
    </div>
  </div>
</div>

                    {/* STEP 4 Resumen */}
                    <div
                        id="step-4"
                        className="tab-pane"
                        role="tabpanel"
                        aria-labelledby="step-3"
                    >
                        <div className="col-md-12">
                            <h4>Resumen del Carrito</h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Imagen</th>
                                        <th>Valor</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="align-middle">{item.nombre}</td>
                                            <td className="align-middle">
                <img src={item.url} alt={item.nombre} style={{ maxWidth: '100px', height: 'auto' }} />
            </td>
                                            <td className="align-middle">
                                                {formatCurrency(item.valor)}
                                            </td>
                                            <td className="align-middle">
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        removeItemFromCart(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="text-end">
                                <h4>
                                    Total a Pagar: {formatCurrency(totalValue)}
                                </h4>
                                <button
                                    className="btn btn-success"
                                    onClick={() =>
                                        handleInsertItem(cartItems[0].id)
                                    }
                                >
                                    Confirmar Compra
                                </button>
                            </div>
                        </div>
                    </div>
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
        </div>
    );
};

export default Cart;
