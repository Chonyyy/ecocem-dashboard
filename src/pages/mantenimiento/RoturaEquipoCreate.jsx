import '../../css/page/mantenimiento/equipoCreate.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function RoturaEquipoCreate() {
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        amId: 0,
        description: descripcion
      };
      const response = await axios.post('/RoturaEquipo', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newRoturaEquipo">
      <h1 className="newRoturaEquipoTitle">Crear RoturaEquipo</h1>
      <form className="newRoturaEquipoForm" onSubmit={handleSubmit}>
        <div className="newRoturaEquipoItem">
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="newRoturaEquipoTextarea"
          />
        </div>
        <button type="submit" className="newRoturaEquipoButton">Create</button>
      </form>
    </div>
  );
}

export default RoturaEquipoCreate;
