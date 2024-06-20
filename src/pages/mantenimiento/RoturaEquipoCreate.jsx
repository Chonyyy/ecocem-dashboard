import '../../css/page/mantenimiento/roturaEquipoCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function RoturaEquipoCreate() {
  const [equipoId, setEquipoId] = useState("");
  const [roturaId, setRoturaId] = useState("");
  const [fecha, setFecha] = useState(new Date());

    //Lista de roturas
    const [roturas, setRoturas] = useState([]);
  
    useEffect(() => {
      axios.get(`http://localhost:5103/api/Rotura`)
        .then(res => {
          setRoturas(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    //Lista de equipos
  const [equipos, setEquipos] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:5103/api/Equipo`)
      .then(res => {
        setEquipos(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        equipoId: equipoId,
        roturaId: roturaId,
        fechaId: fecha
      };
      const response = await axios.post('/RoturaEquipo', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newRoturaEquipo">
      <h1 className="newRoturaEquipoTitle">Crear RoturaEquipo</h1>
      <form className="newRoturaEquipoForm" onSubmit={handleSubmit}>
        <div className="newRoturaEquipoItem">
          <label>Equipo</label>
          <select
          value={equipoId}
          onChange={(e) => setEquipoId(e.target.value)}
          >
          {equipos.map((equipo) => (
          <option key={equipo.equipoId} value={equipo.equipoId}>
            {equipo.equipoId}
          </option>
          ))}
          </select>       

          <label>Tipo de Rotura</label>
          <select
          value={roturaId}
          onChange={(e) => setRoturaId(e.target.value)}
        >
          {roturas.map((rotura) => (
            <option key={rotura.roturaId} value={rotura.roturaId}>
              {rotura.nombreRotura}
            </option>
          ))}
        </select>

          <label>Fecha de la Rotura</label>
          <input
          type="datetime-local"
          value={fecha.toISOString().substring(0,16)}
          onChange={(e) => setFecha(new Date(e.target.value))}
         
        />
          
        </div>
        <button type="submit" className="newRoturaEquipoButton">Create</button>
      </form>
    </div>
  );
}

export default RoturaEquipoCreate;
