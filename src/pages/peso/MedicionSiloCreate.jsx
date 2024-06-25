import '../../css/page/peso/basculaCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function MedicionSiloCreate() {
    const [siloId, setSiloId] = useState(1);
  const [medidorId, setMedidorId] = useState(1);
  const [fechaId, setFecha] = useState(new Date());
  const [nivel, setNivel] = useState(1);
  const [pesoMedidor, setPesoMedidor] = useState(1);
  const [volumen, setVolumen] = useState(1);


    //Lista de silos
  const [silos, setSilos] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:5103/api/Silo`)
      .then(res => {
        setSilos(res.data);
      })
      .catch(err => console.log(err));
  }, []);

      //Lista de medidores
      const [medidores, setMedidores] = useState([]);

      useEffect(() => {
        axios.get(`http://localhost:5103/api/Medidor`)
          .then(res => {
            setMedidores(res.data);
          })
          .catch(err => console.log(err));
      }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        siloId: siloId,
        medidorId: medidorId,
        fecha: fechaId,
        nivel: nivel,
        pesoM: pesoMedidor,
        volumen: volumen,
      };
      const response = await axios.post('/MedicionSilo', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newMedicionSilo">
      <h1 className="newMedicionSiloTitle">Crear MedicionSilo</h1>
      <form className="newMedicionSiloForm" onSubmit={handleSubmit}>
        <div className="newMedicionSiloItem">
        <label>Seleccionar silo:</label>
        <select
          value={siloId}
          onChange={(e) => setSiloId(e.target.value)}
        >
          {silos.map((silo) => (
            <option key={silo.siloId} value={silo.siloId}>
              {silo.nombre}
            </option>
          ))}
        </select>

        <label>Seleccionar medidor:</label>
        <select
            value={medidorId}
            onChange={(e) => setMedidorId(e.target.value)}
            width={80}
            marginBottom={30}
          >
            {medidores.map((medidor) => (
              <option key={medidor.medidorId} value={medidor.medidorId}>
                {medidor.noSerie}
              </option>
            ))}
          </select>

          <label>Fecha:</label>
          <input
            type="datetime-local"
            value={fechaId.toISOString().substring(0,16)}
            onChange={(e) => setFecha(new Date(e.target.value))}
            className="newMedicionSiloTextarea"
          />

          <label>Nivel</label>
          <textarea
            value={nivel}
            placeholder="Ingrese el Nivel"
            onChange={(e) => setNivel(e.target.value)}
            className="newMedicionSiloTextarea"
          />

        <label>Peso</label>
          <textarea
            value={pesoMedidor}
            placeholder="Ingrese el Peso del medidor"
            onChange={(e) => setPesoMedidor(e.target.value)}
           className="newMedicionSiloTextarea"
          />

        <label>Volumen</label>
          <textarea
           value={volumen}
           placeholder="Ingrese el volumen"
           onChange={(e) => setVolumen(e.target.value)}
           className="newMedicionSiloTextarea"
          />
        </div>
        <button type="submit" className="newMedicionSiloButton">Create</button>
      </form>
    </div>
  );
}

export default MedicionSiloCreate;
