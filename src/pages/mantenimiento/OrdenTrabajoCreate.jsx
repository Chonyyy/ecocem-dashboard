import '../../css/page/mantenimiento/equipoCreate.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function OrdenTrabajoCreate() {
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        amId: 0,
        description: descripcion
      };
      const response = await axios.post('/OrdenTrabajo', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newOrdenTrabajo">
      <h1 className="newOrdenTrabajoTitle">Crear OrdenTrabajo</h1>
      <form className="newOrdenTrabajoForm" onSubmit={handleSubmit}>
        <div className="newOrdenTrabajoItem">
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="newOrdenTrabajoTextarea"
          />
        </div>
        <button type="submit" className="newOrdenTrabajoButton">Create</button>
      </form>
    </div>
  );
}

export default OrdenTrabajoCreate;
