import '../../css/page/peso/cargaCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function CargaCreate({sedeId, entidadCompradoraId, fechaVentaId, onClose}) {
    const [tipoCementoId, setTipoCementoId] = useState(1);
    const [siloId, setSiloId] = useState(1);
    const [vehiculoId, setVehiculoId] = useState(1);
    const [medidorId, setMedidorId] = useState(1);
    const [basculaId, setBasculaId] = useState(1);
    const [nivel, setNivel] = useState(1);
    const [pesoMedidor, setPesoMedidor] = useState(1);
    const [pesoBascula, setPesoBascula] = useState(1);
    const [volumen, setVolumen] = useState(1);
    const [fechaId, setFecha] = useState(new Date());

      //Lista de tipoCementos
      const [tipoCementos, setTipoCementos] = useState([]);
    
      useEffect(() => {
        axios.get(`/TipoCemento`)
          .then(res => {
            setTipoCementos(res.data);
          })
          .catch(err => console.log(err));
      }, []);
  
      //Lista de silos
    const [silos, setSilos] = useState([]);
    
    useEffect(() => {
      axios.get(`/api/Silo`)
        .then(res => {
          setSilos(res.data);
        })
        .catch(err => console.log(err));
    }, []);
  
        //Lista de vehiculos
        const [vehiculos, setVehiculos] = useState([]);
    
        useEffect(() => {
          axios.get(`/Vehiculo`)
            .then(res => {
              setVehiculos(res.data);
            })
            .catch(err => console.log(err));
        }, []);
  
        //Lista de medidores
        const [medidores, setMedidores] = useState([]);
  
        useEffect(() => {
          axios.get(`/Medidor`)
            .then(res => {
              setMedidores(res.data);
            })
            .catch(err => console.log(err));
        }, []);
  
        //Lista de basculas
        const [basculas, setBasculas] = useState([]);
    
        useEffect(() => {
          axios.get(`/Bascula`)
            .then(res => {
              setBasculas(res.data);
            })
            .catch(err => console.log(err));
        }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
        // TODO
      const newEntry = {
        tipoCementoId: tipoCementoId,
        siloId: siloId,
        vehiculoId: vehiculoId,
        fecha: fechaId,
        medidorId: medidorId,
        nivel: nivel,
        pesoM: pesoMedidor,
        volumen: volumen,
        basculaId: basculaId,
        pesoB: pesoBascula,
        sedeId: sedeId,
        entidadCompradoraId: entidadCompradoraId,
        fechaVentaId: fechaVentaId
      };
      const response = await axios.post('/Carga', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="newCarga">
      <h1 className="newCargaTitle">Crear Carga</h1>
      <form className="newCargaForm" onSubmit={handleSubmit}>
        <div className="newCargaItem">
        <label>Tipo de Cemento</label>
        <select
        value={tipoCementoId}
        onChange={(e) => setTipoCementoId(e.target.value)}
        >
        {tipoCementos.map((tipoCemento) => (
        <option key={tipoCemento.tipoCementoId} value={tipoCemento.tipoCementoId}>
        {tipoCemento.nombreTipoCemento}
        </option>
        ))}
        </select>

        <label>Silo</label>
        <select
          value={siloId}
          onChange={(e) => setSiloId(e.target.value)}
        >
          {silos.map((silo) => (
            <option key={silo.siloId} value={silo.siloId}>
              {silo.nombre}
            </option>
          ))}
        </select>Seleccionar Vehículo

        <label>Seleccionar Vehículo</label>
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

        <label>Fecha de la carga</label>
        <input
          type="datetime-local"
          value={fechaId.toISOString().substring(0,16)}
          onChange={(e) => setFecha(new Date(e.target.value))}
        />

        <label>Medicion Silo</label>

        <label>Seleccionar Medidor</label>
          <select
            value={medidorId}
            onChange={(e) => setMedidorId(e.target.value)}
          >
            {medidores.map((medidor) => (
              <option key={medidor.medidorId} value={medidor.medidorId}>
                {medidor.noSerie}
              </option>
            ))}
          </select>

          <label>Nivel</label>
          <input
            value={nivel}
            placeholder="Ingrese el Nivel"
            onChange={(e) => setNivel(e.target.value)}
          />

            <label>Volumen</label>
            <input
            value={pesoMedidor}
            placeholder="Ingrese el Peso del medidor"
            onChange={(e) => setPesoMedidor(e.target.value)}
          />

            <label>Peso del medidor</label>
            <input
            value={volumen}
            placeholder="Ingrese el volumen"
            onChange={(e) => setVolumen(e.target.value)}
          />


            <label>Medición Báscula</label>

            <label>Seleccionar Báscula</label>
            <select
            value={basculaId}
            onChange={(e) => setBasculaId(e.target.value)}
          >
            {basculas.map((bascula) => (
              <option key={bascula.basculaId} value={bascula.basculaId}>
                {bascula.noSerie}
              </option>
            ))}
          </select>

            <label>Peso de la Báscula</label>
            <input
            value={pesoBascula}
            placeholder="Ingrese el Peso de la bascula"
            onChange={(e) => setPesoBascula(e.target.value)}
            marginTop={0.5}
            marginBottom={15}
            width={80}
            backgroundColor="white"

          />


        </div>
        <button type="submit" className="newCargaButton">Create</button>
      </form>
    </div>
  );
}

export default CargaCreate;
