import '../../css/page/mantenimiento/tipoRoturaCreate.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function TipoRoturaCreate() {
  const [nombreRotura, setNombreRotura] = useState("");
  const [descripcion, setDescripcion] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        roturaId: 0,
        nombreRotura: nombreRotura,
        descripcion: descripcion
      };
      const response = await axios.post('/Rotura', newEntry);
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
          <label>Nombre de la Rotura</label>
          <input
            value={nombreRotura}
            placeholder="Ingrese el nombre de la Rotura"
            onChange={(a) => setNombreRotura(a.target.value)}
            className="newTipoRoturaTextarea"
          />

          <label>Descripción de la Rotura</label>
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="newAccionMantenimientoTextarea"
          />

        </div>
        <button type="submit" className="newTipoRoturaButton">Create</button>
      </form>
    </div>
  );
}

export default TipoRoturaCreate;
