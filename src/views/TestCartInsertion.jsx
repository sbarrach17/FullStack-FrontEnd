import React, { useState, useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext'; // Ajusta la ruta según donde esté ubicado GlobalContext

const TestCartInsertion = () => {
    const { insertarAlCarro } = useContext(GlobalContext);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        rut: '',
        email: '',
        numero: '',
        region: '',
        comuna: '',
        direccion: '',
        domicilio: '',
        departamento: '',
        producto_id: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleInsertItem = async () => {
        try {
            await insertarAlCarro(formData);
            console.log('Producto insertado correctamente en el carrito.');
        } catch (error) {
            console.error('Error al insertar ítem en el carrito desde la vista de prueba:', error);
        }
    };

    return (
        <div>
            <h2>Vista de prueba para insertar en el carrito</h2>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleInputChange} />
                </div>
                <div>
                    <label>RUT:</label>
                    <input type="text" name="rut" value={formData.rut} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Número:</label>
                    <input type="text" name="numero" value={formData.numero} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Región:</label>
                    <input type="text" name="region" value={formData.region} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Comuna:</label>
                    <input type="text" name="comuna" value={formData.comuna} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Dirección:</label>
                    <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Domicilio:</label>
                    <input type="text" name="domicilio" value={formData.domicilio} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Departamento:</label>
                    <input type="text" name="departamento" value={formData.departamento} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Producto ID:</label>
                    <input type="number" name="producto_id" value={formData.producto_id} onChange={handleInputChange} />
                </div>
                <button type="button" onClick={handleInsertItem}>Insertar producto de prueba</button>
            </form>
        </div>
    );
};

export default TestCartInsertion;
