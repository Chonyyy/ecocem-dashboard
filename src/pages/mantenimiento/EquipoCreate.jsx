import '../../css/page/mantenimiento/equipoCreate.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function EquipoCreate() {
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        amId: 0,
        description: descripcion
      };
      const response = await axios.post('/Equipo', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newEquipo">
      <h1 className="newEquipoTitle">Crear Equipo</h1>
      <form className="newEquipoForm" onSubmit={handleSubmit}>
        <div className="newEquipoItem">
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="newEquipoTextarea"
          />
        </div>
        <button type="submit" className="newEquipoButton">Create</button>
      </form>
    </div>
  );
}

export default EquipoCreate;
