import '../../css/page/administracion/empresaCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function EmpresaCreate() {
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        numeroEmpresa: 0,
        nombreEmpresa: nombreEmpresa
      };
      const response = await axios.post('/Empresa', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newEmpresa">
      <h1 className="newEmpresaTitle">Crear Empresa</h1>
      <form className="newEmpresaForm" onSubmit={handleSubmit}>
        <div className="newEmpresaItem">

          <label>Nombre</label>
          <textarea
            value={nombreEmpresa}
            placeholder="Ingrese el nombre de la Empresa"
            onChange={(e) => setNombreEmpresa(e.target.value)}
            className="newEmpresaTextarea"
          />
        </div>
        <button type="submit" className="newEmpresaButton">Create</button>
      </form>
    </div>
  );
}

export default EmpresaCreate;
