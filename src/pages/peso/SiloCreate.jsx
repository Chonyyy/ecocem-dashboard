import '../../css/page/peso/siloCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function SiloCreate() {
    const [numeroSilo, setNumeroSilo] = useState("");
  const [radio, setRadio] = useState(1);
  const [noSede, setSedeId] = useState(1);
  const [altura, setAltura] = useState(1);

  //Lista de sedes
  const [sedes, setSedes] = useState([]);
  
  useEffect(() => {
  axios.get(`/Sede`)
    .then(res => {
      setSedes(res.data);
    })
    .catch(err => console.log(err));
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        siloId: 0,
        noSilo: numeroSilo,
        noSede:noSede,
        radio:radio,
        altura:altura,
      };
      const response = await axios.post('/Silo', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newSilo">
      <h1 className="newSiloTitle">Crear Silo</h1>
      <form className="newSiloForm" onSubmit={handleSubmit}>
        <div className="newSiloItem">
        <label>Nombre</label>
          <input
            value={numeroSilo}
            placeholder="Ingrese el Nombre de la Silo"
            onChange={(e) => setNumeroSilo(e.target.value)}
            className="newSiloTextarea"
          />

          <label>Altura</label>
          <textarea
            value={altura}
            placeholder="Ingrese la Altura"
            onChange={(e) => setAltura(e.target.value)}
            className="newSiloTextarea"
          />

        <label>Radio</label>
          <textarea
            value={radio}
            placeholder="Ingrese el radio"
            onChange={(e) => setRadio(e.target.value)}
            className="newSiloTextarea"
          />

        <label>Seleccione la sede</label>
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
        <button type="submit" className="newSiloButton">Create</button>
      </form>
    </div>
  );
}

export default SiloCreate;
