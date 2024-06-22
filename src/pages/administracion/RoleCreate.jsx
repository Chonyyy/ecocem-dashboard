import '../../css/page/administracion/empresaCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function EmpresaCreate() {
    const [nombreRol, setNombreRol] = useState("");
  const [descripcionRol, setDescripcionRol] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        nombreRol: nombreRol,
        descripcionRol: descripcionRol
      };
      const response = await axios.post('/Role', newEntry);
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
          <input
            value={nombreRol}
            placeholder="Ingrese el nombre del Rol"
            onChange={(e) => setNombreRol(e.target.value)}
            className="newEmpresaTextarea"
          />

        <label>Descripcion</label>
          <textarea
            value={descripcionRol}
            placeholder="Ingrese la descripción del Rol"
            onChange={(e) => setDescripcionRol(e.target.value)}
            className="newEmpresaTextarea"
          />
        </div>
        <button type="submit" className="newEmpresaButton">Create</button>
      </form>
    </div>
  );
}

export default EmpresaCreate;
