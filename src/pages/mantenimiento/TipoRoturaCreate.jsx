import '../../css/page/mantenimiento/equipoCreate.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function TipoRoturaCreate() {
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        amId: 0,
        description: descripcion
      };
      const response = await axios.post('/TipoRotura', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newTipoRotura">
      <h1 className="newTipoRoturaTitle">Crear TipoRotura</h1>
      <form className="newTipoRoturaForm" onSubmit={handleSubmit}>
        <div className="newTipoRoturaItem">
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="newTipoRoturaTextarea"
          />
        </div>
        <button type="submit" className="newTipoRoturaButton">Create</button>
      </form>
    </div>
  );
}

export default TipoRoturaCreate;
