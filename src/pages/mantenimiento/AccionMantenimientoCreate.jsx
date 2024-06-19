import '../../css/page/mantenimiento/accionMantenimientoCreate.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AccionMantenimientoCreate() {
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        amId: 0,
        description: descripcion
      };
      const response = await axios.post('/AccionMantenimiento', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newAccionMantenimiento">
      <h1 className="newAccionMantenimientoTitle">Crear Acción Mantenimiento</h1>
      <form className="newAccionMantenimientoForm" onSubmit={handleSubmit}>
        <div className="newAccionMantenimientoItem">
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="newAccionMantenimientoTextarea"
          />
        </div>
        <button type="submit" className="newAccionMantenimientoButton">Create</button>
      </form>
    </div>
  );
}

export default AccionMantenimientoCreate;
