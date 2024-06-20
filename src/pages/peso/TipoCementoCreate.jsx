import '../../css/page/peso/tipoCementoCreate.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function TipoCementoCreate() {
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
    <div className="newTipoCemento">
      <h1 className="newTipoCementoTitle">Crear TipoCemento</h1>
      <form className="newTipoCementoForm" onSubmit={handleSubmit}>
        <div className="newTipoCementoItem">
        <label>Nombre</label>
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="newTipoCementoTextarea"
          />
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="newTipoCementoTextarea"
          />
        </div>
        <button type="submit" className="newTipoCementoButton">Create</button>
      </form>
    </div>
  );
}

export default TipoCementoCreate;
