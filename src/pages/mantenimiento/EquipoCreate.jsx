import '../../css/page/mantenimiento/equipoCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function EquipoCreate() {
  const [equipoId, setEquipoId] = useState('');
  const [tipoEId, setTipoEId] = useState('');
  const [sedeId, setSedeId] = useState('');

    //Lista de tipos de equipos
    const [tiposEquipos, setTiposEquipos] = useState([]);
  
    useEffect(() => {
      axios.get(`/TipoEquipo`)
        .then(res => {
          setTiposEquipos(res.data);
        })
        .catch(err => console.log(err));
    }, []);

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
        equipoId: equipoId,
        tipoEId: tipoEId,
        sedeId: sedeId
      };
      const response = await axios.post('/Equipo', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newEquipo">
      <h1 className="newEquipoTitle">Crear Equipo</h1>
      <form className="newEquipoForm" onSubmit={handleSubmit}>
        <div className="newEquipoItem">
          <label>Numero de serie del equipo</label>
          <input
            placeholder="Numero de serie del equipo"
            value={equipoId}
            onChange={(e) => setEquipoId(e.target.value)}
            className="newEquipoTextarea"
          />

            <label>Tipo de equipo</label>
            <select 
            value={tipoEId}
            onChange={(e) => setTipoEId(e.target.value)}
            >
            {tiposEquipos.map((tipoEquipo) => (
            <option key={tipoEquipo.tipoEId} value={tipoEquipo.tipoEId}>
              {tipoEquipo.tipoE}
            </option>
          ))}
            </select>

            <label>Sede a la que pertenece</label>
            <select
          value={sedeId}
          onChange={(e) => setSedeId(e.target.value)}
        >
          {sedes.map((sede) => (
            <option key={sede.sedeId} value={sede.sedeId}>
              {sede.nombreSede}
              
            </option>
          ))}
          </select>
        </div>
        <button type="submit" className="newEquipoButton">Create</button>
      </form>
    </div>
  );
}

export default EquipoCreate;
