import '../../css/page/peso/entidadCompradoraCreate.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function EntidadCompradoraCreate() {
    const [numeroEntidadCompradora, setNumeroEntidadCompradora] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        EntidadCompradoraId: 0,
        NombreEntidadCompradora: numeroEntidadCompradora
      };
      const response = await axios.post('/EntidadCompradora', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newEntidadCompradora">
      <h1 className="newEntidadCompradoraTitle">Crear EntidadCompradora</h1>
      <form className="newEntidadCompradoraForm" onSubmit={handleSubmit}>
        <div className="newEntidadCompradoraItem">
        <label>Nombre</label>
          <input
            value={numeroEntidadCompradora}
            placeholder="Ingrese el Nombre de la Entidad Compradora"
            onChange={(e) => setNumeroEntidadCompradora(e.target.value)}
            className="newEntidadCompradoraTextarea"
          />
        </div>
        <button type="submit" className="newEntidadCompradoraButton">Create</button>
      </form>
    </div>
  );
}

export default EntidadCompradoraCreate;
