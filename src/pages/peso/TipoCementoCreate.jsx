import '../../css/page/peso/tipoCementoCreate.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function TipoCementoCreate() {
    const [numeroTipoCemento, setNumeroTipoCemento] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        TipoCementoId: 0,
        NombreTipoCemento: numeroTipoCemento
      };
      const response = await axios.post('/TipoCemento', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newTipoCemento">
      <h1 className="newTipoCementoTitle">Crear TipoCemento</h1>
      <form className="newTipoCementoForm" onSubmit={handleSubmit}>
        <div className="newTipoCementoItem">
        <label>Nombre</label>
          <input
            value={numeroTipoCemento}
            placeholder="Ingrese el Nombre del Tipo Cemento"
            onChange={(e) => setNumeroTipoCemento(e.target.value)}  
            className="newTipoCementoTextarea"
          />

        </div>
        <button type="submit" className="newTipoCementoButton">Create</button>
      </form>
    </div>
  );
}

export default TipoCementoCreate;
