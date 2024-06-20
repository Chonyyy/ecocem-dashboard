import '../../css/page/peso/vehiculoCreate.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function VehiculoCreate() {
    const [numeroVehiculo, setNumeroVehiculo] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        VehiculoId: 0,
        NoSerie: numeroVehiculo
      };
      const response = await axios.post('/Vehiculo', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newVehiculo">
      <h1 className="newVehiculoTitle">Crear Vehiculo</h1>
      <form className="newVehiculoForm" onSubmit={handleSubmit}>
        <div className="newVehiculoItem">
        <label>Nombre</label>
          <input
             value={numeroVehiculo}
             placeholder="Ingrese el Nombre del Vehículo"
             onChange={(e) => setNumeroVehiculo(e.target.value)}   
            className="newVehiculoTextarea"
          />
        </div>
        <button type="submit" className="newVehiculoButton">Create</button>
      </form>
    </div>
  );
}

export default VehiculoCreate;
