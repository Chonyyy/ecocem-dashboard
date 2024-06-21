import '../../css/page/administracion/trabajadorCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function TrabajadorCreate() {
    const [nombre, setNombre] = useState("");
    const [sede, setSede] = useState(1);
  
    const [sedes, setSedes] = useState([]);
  
    useEffect(() => {
      axios.get(`http://localhost:5103/api/Sede`)
        .then(res => {
          setSedes(res.data);
        })
        .catch(err => console.log(err));
    }, []);
  
  

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        trabajadorId: 0,
        nombreTrabajador: nombre,
        sedeId: sede
      };
      const response = await axios.post('/Trabajador', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newTrabajador">
      <h1 className="newTrabajadorTitle">Crear Trabajador</h1>
      <form className="newTrabajadorForm" onSubmit={handleSubmit}>
        <div className="newTrabajadorItem">
        <label>Nombre</label>
          <input
            value={nombre}
            placeholder="Ingrese el nombre del trabajador"
            onChange={(e) => setNombre(e.target.value)}
            className="newTrabajadorTextarea"
          />

        <label>Sede</label>
        <select
         value={sede}
         onChange={(e) => setSede(e.target.value)}
        >
        {sedes.map((sede) => (
           <option key={sede.sedeId} value={sede.sedeId}>
            {sede.nombreSede}
           </option>
         ))}
        </select>


        </div>
        <button type="submit" className="newTrabajadorButton">Create</button>
      </form>
    </div>
  );
}

export default TrabajadorCreate;
