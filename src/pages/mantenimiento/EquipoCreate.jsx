import '../../css/page/mantenimiento/equipoCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EquipoCreate() {
  const [equipoId, setEquipoId] = useState('');
  const [tipoEId, setTipoEId] = useState('');
  const [sedeId, setSedeId] = useState('');

  //Lista de tipos de equipos
  const [tiposEquipos, setTiposEquipos] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tiposResponse, sedesResponse] = await Promise.all([
          axios.get(`/TipoEquipo`),
          axios.get(`/Sede`)
        ]);

        setTiposEquipos(tiposResponse.data);
        setSedes(sedesResponse.data);
        
        if (tiposResponse.data.length > 0) {
          setTipoEId(tiposResponse.data[0].tipoEId); // Set the default value
        }
        
        if (sedesResponse.data.length > 0) {
          setSedeId(sedesResponse.data[0].sedeId); // Set the default value
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
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
        console.log("SUCCESSFULL RESPONSE");
        navigate(-1); // Redirect to the previous page
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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