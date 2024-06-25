import '../../css/page/peso/medicionBasculaCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function MedicionBasculaCreate() {
    const [vehiculoId, setVehiculoId] = useState(1);
    const [basculaId, setBasculaId] = useState(1);
    const [fechaId, setFecha] = useState(new Date());
    const [pesoBascula, setPesoBascula] = useState(1);
  
  
        //Lista de vehiculos
        const [vehiculos, setVehiculos] = useState([]);
    
        useEffect(() => {
          axios.get(`http://localhost:5103/api/Vehiculo`)
            .then(res => {
              setVehiculos(res.data);
            })
            .catch(err => console.log(err));
        }, []);
  
  
        //Lista de basculas
        const [basculas, setBasculas] = useState([]);
    
        useEffect(() => {
          axios.get(`http://localhost:5103/api/Bascula`)
            .then(res => {
              setBasculas(res.data);
            })
            .catch(err => console.log(err));
        }, []);
  
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        vehiculoId: vehiculoId,
        basculaId: basculaId,
        fecha: fechaId,
        pesoB: pesoBascula
      };
      const response = await axios.post('/MedicionBascula', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newMedicionBascula">
      <h1 className="newMedicionBasculaTitle">Crear MedicionBascula</h1>
      <form className="newMedicionBasculaForm" onSubmit={handleSubmit}>
        <div className="newMedicionBasculaItem">
        <label>Seleccionar vehiculo</label>
        <select
          value={vehiculoId}
          onChange={(e) => setVehiculoId(e.target.value)}
        >
          {vehiculos.map((vehiculo) => (
            <option key={vehiculo.vehiculoId} value={vehiculo.vehiculoId}>
              {vehiculo.noSerie}
            </option>
          ))}
        </select>

        <label>Seleccionar bascula</label>
        <select
            value={basculaId}
            onChange={(e) => setBasculaId(e.target.value)}
            width={80}
            marginBottom={30}
          >
            {basculas.map((bascula) => (
              <option key={bascula.basculaId} value={bascula.basculaId}>
                {bascula.noSerie}
              </option>
            ))}
          </select>
        
          <label>Fecha</label>
          <input
           type="datetime-local"
           value={fechaId.toISOString().substring(0,16)}
           onChange={(e) => setFecha(new Date(e.target.value))}
            className="newMedicionBasculaTextarea"
          />

          <label>Peso de la bascula</label>
          <input
            value={pesoBascula}
            placeholder="Ingrese el Peso de la bascula"
            onChange={(e) => setPesoBascula(e.target.value)}
            className="newMedicionBasculaTextarea"
          />
        {/* <label>Sede</label>
        <select
          value={noSede}
          onChange={(e) => setSedeId(e.target.value)}
        >
          {sedes.map((sede) => (
            <option key={sede.sedeId} value={sede.sedeId}>
              {sede.nombreSede}
              
            </option>
          ))}
        </select> */}
        </div>
        <button type="submit" className="newMedicionBasculaButton">Create</button>
      </form>
    </div>
  );
}

export default MedicionBasculaCreate;
