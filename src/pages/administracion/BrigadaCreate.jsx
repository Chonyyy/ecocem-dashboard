import '../../css/page/administracion/brigadaCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function BrigadaCreate() {
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        brigadaId: 0,
        descripcion: descripcion
      };
      const response = await axios.post('/Brigada', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newBrigada">
      <h1 className="newBrigadaTitle">Crear Brigada</h1>
      <form className="newBrigadaForm" onSubmit={handleSubmit}>
        <div className="newBrigadaItem">
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="newBrigadaTextarea"
          />

        </div>
        <button type="submit" className="newBrigadaButton">Create</button>
      </form>
    </div>
  );
}

export default BrigadaCreate;
