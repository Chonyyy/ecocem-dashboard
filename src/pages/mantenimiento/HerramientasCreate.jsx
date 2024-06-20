import '../../css/page/mantenimiento/herramientasCreate.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function HerramientasCreate() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        herramientaId: 0,
        nombre: nombre,
        descripcion: descripcion
      };
      const response = await axios.post('/Herramientas', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newHerramientas">
      <h1 className="newHerramientasTitle">Crear Herramientas</h1>
      <form className="newHerramientasForm" onSubmit={handleSubmit}>
        <div className="newHerramientasItem">
        <label>Nombre</label>
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="newHerramientasTextarea"
          />
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="newHerramientasTextarea"
          />
        </div>
        <button type="submit" className="newHerramientasButton">Create</button>
      </form>
    </div>
  );
}

export default HerramientasCreate;
