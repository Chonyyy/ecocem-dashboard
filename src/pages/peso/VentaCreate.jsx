import '../../css/page/peso/ventaCreate.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function VentaCreate() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        herramientaId: 0,
        nombre: nombre,
        descripcion: descripcion
      };
      const response = await axios.post('/Herramienta', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newVenta">
      <h1 className="newVentaTitle">Crear Venta</h1>
      <form className="newVentaForm" onSubmit={handleSubmit}>
        <div className="newVentaItem">
        <label>Nombre</label>
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="newVentaTextarea"
          />
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="newVentaTextarea"
          />
        </div>
        <button type="submit" className="newVentaButton">Create</button>
      </form>
    </div>
  );
}

export default VentaCreate;
