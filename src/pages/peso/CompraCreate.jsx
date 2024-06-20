import '../../css/page/peso/compraCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function CompraCreate() {
    const [sedeId, setSedeId] = useState(1);
    const [fabricaId, setFabricaId] = useState(1);
    const [fechaId, setFecha] = useState(new Date());
  
      //Lista de sedes
      const [sedes, setSedes] = useState([]);
    
      useEffect(() => {
        axios.get(`/Sede`)
          .then(res => {
            setSedes(res.data);
          })
          .catch(err => console.log(err));
      }, []);
  
      //Lista de fabricas
    const [fabricas, setFabricas] = useState([]);
    
    useEffect(() => {
      axios.get(`/Fabrica`)
        .then(res => {
          setFabricas(res.data);
        })
        .catch(err => console.log(err));
    }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        sedeId: sedeId,
        fabricaId: fabricaId,
        fecha: fechaId
      };
      const response = await axios.post('/Compra', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newCompra">
      <h1 className="newCompraTitle">Crear Compra</h1>
      <form className="newCompraForm" onSubmit={handleSubmit}>
        <div className="newCompraItem">
        <label>Sede</label>
        <select
        value={sedeId}
        onChange={(e) => setSedeId(e.target.value)}
        width={80}
        marginBottom={30}
        >
        {sedes.map((sede) => (
        <option key={sede.sedeId} value={sede.sedeId}>
        {sede.nombreSede}
        </option>
        ))}
        </select>

          <label>Fábrica</label>
          <select
          value={fabricaId}
          onChange={(e) => setFabricaId(e.target.value)}
          width={80}
          marginBottom={30}
        >
          {fabricas.map((fabrica) => (
            <option key={fabrica.fabricaId} value={fabrica.fabricaId}>
              {fabrica.nombre}
            </option>
          ))}
        </select>

        <label>Fecha</label>
        <input
          type="datetime-local"
          value={fechaId.toISOString().substring(0,16)}
          onChange={(e) => setFecha(new Date(e.target.value))}
        />

        </div>
        <button type="submit" className="newCompraButton">Create</button>
      </form>
    </div>
  );
}

export default CompraCreate;
