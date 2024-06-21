import '../../css/page/administracion/sedeCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function SedeCreate() {
    const [nombreSede, setNombreSede] = useState("");
    const [ubicacionSede, setUbicacion] = useState("");
    const [empresaId, setEmpresaId] = useState(1);
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5103/api/Empresa`)
          .then(res => {
            setEmpresas(res.data);
          })
          .catch(err => console.log(err));
      }, []);    
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        sedeId: 0,
        nombreSede: nombreSede,
        ubicacionSede: ubicacionSede,
        empresaId: empresaId
      };
      const response = await axios.post('/Sede', newEntry);
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
      <h1 className="newTrabajadorTitle">Crear Sede</h1>
      <form className="newTrabajadorForm" onSubmit={handleSubmit}>
        <div className="newTrabajadorItem">
        <label>Nombre</label>
          <input
            value={nombreSede}
            placeholder="Ingrese el nombre de la Sede"
            onChange={(e) => setNombreSede(e.target.value)}
            className="newTrabajadorTextarea"
          />
            <label>Ubicacion</label>
            <input
                value={ubicacionSede}
                placeholder="Ingrese la ubicación"
                onChange={(e) => setUbicacion(e.target.value)}
                className="newTrabajadorTextarea"
            />

        <label>Empresa</label>
        <select
          value={empresaId}
          onChange={(e) => setEmpresaId(e.target.value)}
        >
          {empresas.map((empresa) => (
            <option key={empresa.empresaId} value={empresa.empresaId}>
              {empresa.nombreEmpresa}
            </option>
          ))}
        </select>


        </div>
        <button type="submit" className="newTrabajadorButton">Create</button>
      </form>
    </div>
  );
}

export default SedeCreate;
