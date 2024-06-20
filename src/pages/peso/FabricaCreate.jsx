import '../../css/page/peso/FabricaCreate.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function FabricaCreate() {
  const [numeroFabrica, setNumeroFabrica] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        FabricaId: 0,
        Nombre: numeroFabrica
      };
      const response = await axios.post('/Fabrica', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newFabrica">
      <h1 className="newFabricaTitle">Crear Fabrica</h1>
      <form className="newFabricaForm" onSubmit={handleSubmit}>
        <div className="newFabricaItem">
        <label>Nombre</label>
          <input
            value={numeroFabrica}
            placeholder="Ingrese el Nombre de la Fabrica"
            onChange={(e) => setNumeroFabrica(e.target.value)}
            className="newFabricaTextarea"
          />
        </div>
        <button type="submit" className="newFabricaButton">Create</button>
      </form>
    </div>
  );
}

export default FabricaCreate;
