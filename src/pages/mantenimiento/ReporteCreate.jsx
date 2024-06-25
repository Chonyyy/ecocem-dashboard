import '../../css/page/mantenimiento/reporteCreate.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function ReporteCreate() {
    const [equipoId, setEquipoId] = useState(1);
    const [fechaId, setFecha] = useState(new Date());
    const [tiempoRealParoFalla, setTiempoRealParoFalla] = useState(1); //Tiempo real de paro por falla, en horas.
    const [tiempoRealMant, setTiempoRealMant] = useState(1); //Tiempo de operación real en horas.
    const [tiempoOperacionReal, setTiempoOperacionReal] = useState(1); //Disponibilidad Real.
    const [tiempoParoTrabajosPlan, setTiempoParoTrabajosPlan] = useState(1); //Tiempo de paro por ejecución de trabjos planificados.
    const [tiempoParoMant, setTiempoParoMant] = useState(1); //Tiempo real de paro por mtto. Contempla intervenciones planificadas más imprevistas en horas tdm=Σtmp + Σtr. (tdm) 
    const [tiempoOperacionRequerido, setTiempoOperacionRequerido] = useState(1); //Tiempo de operación requerido según programa de producción en horas.
    const [tiempoRequeridoAccProgramadas, setTiempoRequeridoAccProgramadas] = useState(1); //Tiempo requerido para las intervenciones programadas  de mtto en horas.
    const [costoTotalMant, setCostoTotalMant] = useState(1); //Costo total de mantenimiento.
    const [facturacion, setFacturacion] = useState(1); //Facturación de la empresa en el periodo analizado.
    const [costoMantContratado, setCostoMantContratado] = useState(1); //Costo de los mttos contratados.
    //temporal en verdad esto es un indicdor
    const [perdidaIndisponibilidad, setPerdidaIndisponibilidad]=useState(1);//PerdidaIndisponibilidad
    const [horasTotal, setHorasTotal] = useState([]); //horas total del equipo para mantenimiento
  
    
    //Lista de equipos
    const [equipos, setEquipos] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5103/api/Equipo`)
        .then(res => {
            setEquipos(res.data);
        })
        .catch(err => console.log(err));
    }, []);
    
    const [equiposPorTE, setEquiposPorTE] = useState([]);
    useEffect(() => {
      axios.get(`/TipoEquipo`)
        .then(res => {
            setEquiposPorTE(res.data);
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
        equipoId : equipoId,
        fechaId: fechaId,
        tiempoRealParoFalla: tiempoRealParoFalla,
        tiempoRealMant: tiempoRealMant,
        tiempoOperacionReal: tiempoOperacionReal,
        tiempoParoTrabajosPlan:tiempoParoTrabajosPlan,
        tiempoParoMant: tiempoParoMant,
        tiempoOperacionRequerido:tiempoOperacionRequerido,
        tiempoRequeridoAccProgramadas:tiempoRequeridoAccProgramadas,
        costoTotalMant:costoTotalMant,
        facturacion:facturacion,
        costoMantContratado:costoMantContratado,
        perdidaIndisponibilidad: perdidaIndisponibilidad
      };
      const response = await axios.post('/Reporte', newEntry);
      if (response.status === 200) {
        console.log("SUCCESSFULL RESPONSE")//TODO REDIRECT TO PREVIOUS PAGE
      }
    } catch (error) {
      console.error("Error creating new entry:", error);
      // Optionally handle error (e.g., show an error message)
    }

    // Esto es para las notificaciones #TODO arreglar
    try {
        const response = await axios.get('http://localhost:5103/api/FiltroMantenimiento/GetHoras',{
          params: {
              equipoId: equipoId,
            },
        });
        setHorasTotal(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  
      try {
        const response = await axios.get('http://localhost:5103/api/FiltroMantenimiento/GetEquipos',{
          params: {
            TipoE: "compresor beltico",
            },
        });
        setEquiposPorTE(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  
      if (equiposPorTE.includes(equipoId) != null)
      {
          // Aviso con una semana de antelacion 7 dias = 168h
          if( horasTotal % 8 <= 168) {
          alert("Verificar nivel de aceite/n Verificar test de lámparas indicadores de panel");
          }
          if( horasTotal % 50 <= 168) {
          alert("Purgar con densado del recipiente de aceite después de una parada de 4h minimo\nLimpiar filtro de aspiración");
          }
          if( horasTotal % 100 <= 168) {
          alert("Cambiar filtros de aspiración y aceite");
          }
          if( horasTotal % 200 <= 168) {
          alert("Cambiar aceite del cárter cuando sea necesario\nRevisar, limpiar y cambiar filtros de aspiración y aceite.\nCambiar aceite del cárter y filtro de aceite");
          }
          if( horasTotal % 1000 <= 168) {
          alert("Revisión válvulas de seguridad\nCambiar filtros de aspiración y aceite\nLimpiar radiadores\nLimpiar filtro de aspiración");
          }
          if( horasTotal % 6000 <= 168) {
          alert("Revisar y cambiar metales de las bielas\nChequear y/o corregir holgura de aros del pistón\nChequear y/o calibrar camisa del desplazamiento del cilindro.\nChequear y rectificar medidas de los muñones del cigüeñal\nChequeo y/o cambio del rodamiento del motor(serviciar motor)\nChequeo de los contadores eléctricos\nChequeo del funcionamiento correcto de las seguridades da cornictors\nChequeo y/o cambio de a instrumentacion\n(manómetros, termómetros, presostatos, etc\nLimpieza, revisión y barnizado del enrollado.\nCalibración de protecciones térmicas");
          }
          if( horasTotal % 8000 <= 168) {
          alert("Sustituir segmentos\nDesarme y revisión total del compresor");
          }
        }
  };

  return (
    <div className="newReporte">
      <h1 className="newReporteTitle">Crear Reporte</h1>
      <form className="newReporteForm" onSubmit={handleSubmit}>
        <div className="newReporteItem">

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

          <label>Fecha del  Reporte</label>
          <input
            type="datetime-local"
            value={fechaId.toISOString().substring(0,16)}
            onChange={(e) => setFecha(new Date(e.target.value))}
            className="newReporteTextarea"
          />

            <label>Parametros</label>

            <label>Tiempo real de paro por falla</label>
           <input
           
           />

<label>Tiempo real de paro por falla</label>
           <input
            value={tiempoRealParoFalla}
            onChange={(e) => setTiempoRealParoFalla(e.target.value)}
           />

<label>Tiempo real de mantenimiento</label>
           <input
           value={tiempoRealMant}
           onChange={(e) => setTiempoRealMant(e.target.value)}  
           
           />

<label>Tiempo Operacion Real</label>
           <input
            value={tiempoOperacionReal}
            onChange={(e) => setTiempoOperacionReal(e.target.value)}
            
           />

<label>Tiempo de paro por trabajos planificados</label>
           <input
           value={tiempoParoTrabajosPlan}
           onChange={(e) => setTiempoParoTrabajosPlan(e.target.value)}
           
           />

<label>Tiempo real de paro por mantenimiento</label>
           <input
           value={tiempoParoMant}
           onChange={(e) => setTiempoParoMant(e.target.value)}
           
           />

<label>TiempoOperacionRequerido</label>
           <input
           value={tiempoOperacionRequerido}
           onChange={(e) => setTiempoOperacionRequerido(e.target.value)}
          
           />

<label>Tiempo Requerido Acciones Programadas</label>
           <input
           value={tiempoRequeridoAccProgramadas}
           onChange={(e) => setTiempoRequeridoAccProgramadas(e.target.value)}
           
           />

<label>Costo Total de Mantenimiento</label>
           <input
           value={costoTotalMant}
           onChange={(e) => setCostoTotalMant(e.target.value)}
          
           />

<label>Facturación</label>
           <input
           value={facturacion}
           onChange={(e) => setFacturacion(e.target.value)}
           
           />

<label>Costo Mtto Contratado</label>
           <input 
            value={costoMantContratado}
            onChange={(e) => setCostoMantContratado(e.target.value)}
            
           />

<label>Perdida de la Indisponibilida</label>
           <input
           value={perdidaIndisponibilidad}
           onChange={(e) => setPerdidaIndisponibilidad(e.target.value)}
           
           />

<label>Tiempo real de paro por falla</label>
           <input
           
           />

        </div>
        <button type="submit" className="newReporteButton">Create</button>
      </form>
    </div>
  );
}

export default ReporteCreate;
