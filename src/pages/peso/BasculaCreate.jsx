import '../../css/page/peso/basculaCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function BasculaCreate() {
    const [basculaId, setbasculaId] = useState(0);
    const [numeroBascula, setNumeroBascula] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [noSede, setSedeId] = useState(1);
   
    //Lista de sedes
    const [sedes, setSedes] = useState([]);
    
  useEffect(() => {
    axios.get(`/Sede`)
      .then(res => {
        setSedes(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  //Lista de basculas
    const createBascula = async () => {
    
      axios.post(`/Bascula`, {
          basculaId: basculaId,
          noSerie: numeroBascula,
          noSede:noSede,
          descripcion:descripcion
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
        alert("Revise que no exista otra bascula con ese número de serie")
      });
    };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        basculaId: basculaId,
        noSerie: numeroBascula,
        sedeId:noSede,
        descripcion:descripcion
      };
      const response = await axios.post('/Bascula', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newBascula">
      <h1 className="newBasculaTitle">Crear Bascula</h1>
      <form className="newBasculaForm" onSubmit={handleSubmit}>
        <div className="newBasculaItem">
        <label>Número de Serie de Bascula</label>
          <input
            value={numeroBascula}
            placeholder="Ingrese el Número de Serie de la Bascula"
            onChange={(e) => setNumeroBascula(e.target.value)}  
            className="newBasculaTextarea"
          />

          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="newBasculaTextarea"
          />
        <label>Sede</label>
        <select
          value={noSede}
          onChange={(e) => setSedeId(e.target.value)}
        >
          {sedes.map((sede) => (
            <option key={sede.sedeId} value={sede.sedeId}>
              {sede.nombreSede}
              
            </option>
          ))}
        </select>
        </div>
        <button type="submit" className="newBasculaButton">Create</button>
      </form>
    </div>
  );
}

export default BasculaCreate;
