import '../../css/page/mantenimiento/ordenTrabajoCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function OrdenTrabajoCreate() {
  const [equipoId, setEquipoId] = useState(1);
  const [brigadaId, setBrigadaId] = useState(1);
  const [trabajadorId, setTrabajadorId] = useState(1);
  const [fecha, setFecha] = useState(new Date());
  const [insertarOrdenTrabajoModalAbierto, setInsertarOrdenTrabajoModalAbierto] = useState(false);

    //Lista de brigadas
    const [brigadas, setBrigadas] = useState([]);
  
    useEffect(() => {
      axios.get(`http://localhost:5103/api/Brigada`)
        .then(res => {
          setBrigadas(res.data);
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

  const [trabajadores, setTrabajadores] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5103/api/Trabajador`)
      .then(res => {
        setTrabajadores(res.data);
      })
      .catch(err => console.log(err));
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        equipoId: equipoId,
        brigadaId: brigadaId,
        trabajadorId: trabajadorId,
        fechaId: fecha
      };
      const response = await axios.post('/OrdenTrabajo', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newOrdenTrabajo">
      <h1 className="newOrdenTrabajoTitle">Crear OrdenTrabajo</h1>
      <form className="newOrdenTrabajoForm" onSubmit={handleSubmit}>
        <div className="newOrdenTrabajoItem">
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

          <label>Brigada</label>
          <select
          value={brigadaId}
          onChange={(e) => setBrigadaId(e.target.value)}
        >
          {brigadas.map((brigada) => (
            <option key={brigada.brigadaId} value={brigada.brigadaId}>
              {brigada.brigadaId}
            </option>
          ))}
        </select>

          <label>Trabajador</label>
          <select
          value={trabajadorId}
          onChange={(e) => setTrabajadorId(e.target.value)}
          width={80}
          marginBottom={30}
        >
          {trabajadores.map((trabajador) => (
            <option key={trabajador.trabajadorId} value={trabajador.trabajadorId}>
              {trabajador.nombreTrabajador}
            </option>
          ))}
        </select>

        <label>Fecha</label>
        <input
         type='datetime-local'
         value={fecha.toISOString().substring(0,16)}
         onChange={(e) => setFecha(new Date(e.target.value))}        
        />
          
        </div>
        <button type="submit" className="newOrdenTrabajoButton">Create</button>
      </form>
    </div>
  );
}

export default OrdenTrabajoCreate;
