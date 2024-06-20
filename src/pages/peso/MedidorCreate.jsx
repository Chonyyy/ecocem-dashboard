import '../../css/page/peso/medidorCreate.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function MedidorCreate() {
    const [numeroMedidor, setNumeroMedidor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        MedidorId: 0,
        NoSerie: numeroMedidor
      };
      const response = await axios.post('/Medidor', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newMedidor">
      <h1 className="newMedidorTitle">Crear Medidor</h1>
      <form className="newMedidorForm" onSubmit={handleSubmit}>
        <div className="newMedidorItem">
          <label>Numero de serie</label>
          <input
            value={numeroMedidor}
            placeholder="Ingrese el Nombre de la Medidor"
            onChange={(e) => setNumeroMedidor(e.target.value)}
            className="newMedidorTextarea"
          />
        </div>
        <button type="submit" className="newMedidorButton">Create</button>
      </form>
    </div>
  );
}

export default MedidorCreate;
