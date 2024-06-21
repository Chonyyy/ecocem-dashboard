import '../../css/page/administracion/tipoEquipoCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function TipoEquipoCreate() {
    const [tipoEquipo, setTipoEquipo] = useState("");
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        tipoEId: 0,
        tipoE: tipoEquipo
      };
      const response = await axios.post('/TipoEquipo', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newTipoEquipo">
      <h1 className="newTipoEquipoTitle">Crear TipoEquipo</h1>
      <form className="newTipoEquipoForm" onSubmit={handleSubmit}>
        <div className="newTipoEquipoItem">
        <label>Tipo de Equipo</label>
          <input
            value={tipoEquipo}
            placeholder="Ingrese el Tipo de equipo"
            onChange={(a) => setTipoEquipo(a.target.value)}
            className="newTipoEquipoTextarea"
          />
        </div>
        <button type="submit" className="newTipoEquipoButton">Create</button>
      </form>
    </div>
  );
}

export default TipoEquipoCreate;
