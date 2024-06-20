import '../../css/page/peso/ventaCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function VentaCreate() {
  const [sedeId, setSedeId] = useState(1);
  const [entidadCompradoraId, setEntidadCompradoraId] = useState(1);
  const [fechaId, setFecha] = useState(new Date());
 
    //Lista de sedes
    const [sedes, setSedes] = useState([]);
  
    useEffect(() => {
      axios.get(`http://localhost:5103/api/Sede`)
        .then(res => {
          setSedes(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    //Lista de entidadCompradoras
  const [entidadCompradoras, setEntidadCompradoras] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:5103/api/EntidadCompradora`)
      .then(res => {
        setEntidadCompradoras(res.data);
      })
      .catch(err => console.log(err));
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        sedeId: sedeId,
        entidadCompradoraId: entidadCompradoraId,
        fecha: fechaId
      };
      const response = await axios.post('/Venta', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newVenta">
      <h1 className="newVentaTitle">Crear Venta</h1>
      <form className="newVentaForm" onSubmit={handleSubmit}>
        <div className="newVentaItem">
        <label>Sede</label>
        <select
        value={sedeId}
        onChange={(e) => setSedeId(e.target.value)}
        width={80}
        marginRight={10}
        marginLeft={10}
        marginBottom={30}
        >
        {sedes.map((sede) => (
        <option key={sede.sedeId} value={sede.sedeId}>
        {sede.nombreSede}
        </option>
        ))}
        </select>

        <label>Sede</label>
        <select
          value={entidadCompradoraId}
          onChange={(e) => setEntidadCompradoraId(e.target.value)}
          width={80}
          marginBottom={30}
        >
          {entidadCompradoras.map((entidadCompradora) => (
            <option key={entidadCompradora.entidadCompradoraId} value={entidadCompradora.entidadCompradoraId}>
              {entidadCompradora.nombreEntidadCompradora}
            </option>
          ))}
        </select>

        <label>Fecha</label>
          <input
            type="datetime-local"
            value={fechaId.toISOString().substring(0,16)}
            onChange={(e) => setFecha(new Date(e.target.value))}
            className="newVentaTextarea"
          />
        </div>
        <button type="submit" className="newVentaButton">Create</button>
      </form>
    </div>
  );
}

export default VentaCreate;
