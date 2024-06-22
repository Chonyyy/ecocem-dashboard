import '../../css/page/mantenimiento/reporte.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkAuth, checkAdmin } from '../../scripts/auth';
import { Box } from '@mui/material';

function Herramientas() {
  const [data, setData] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [administrator, setAdministrator] = useState(false);
  const navigate = useNavigate();
  const [equipoId, setEquipoId] = useState(0);
  const [fechaSeleccionada, setFechaSeleccionada] = useState({
    dia: '',
    mes: '',
    ano: '',
  });
  
  const [reportes, setReportes] = useState([]);

    //Lista de equipos
    const [Equipos, setEquipos] = useState([]);
  
    useEffect(() => {
      axios.get(`http://localhost:5103/api/Equipo`)
        .then(res => {
          setEquipos(res.data);
        })
        .catch(err => console.log(err));
    }, []);

// Lista de días
const dias = Array.from({ length:  31 }, (_, i) => i +  1);

// Lista de meses
const meses = Array.from({ length:  12 }, (_, i) => i +  1);

// Lista de años
const anos = Array.from({ length:  100 }, (_, i) => new Date().getFullYear() - i);

const handleChange = (e, tipo) => {
    setFechaSeleccionada({
      ...fechaSeleccionada,
      [tipo]: e.target.value,
    });
  };


const filtrarLista = async () => {
    try {
      const response = await axios.get('http://localhost:5103/api/FiltroMantenimiento/GetReportes',{
        params: {
            dia: fechaSeleccionada.dia,
            mes: fechaSeleccionada.mes,
            anno: fechaSeleccionada.ano,
            equipoId: equipoId,
          },
      });
      const transformedData = response.data.map(item => ({
        id: item.equipoId,
        fechaId: item.fechaId,
        tiempoRealParoFalla: item.tiempoRealParoFalla,
        tiempoRealMant: item.tiempoRealMant,
        tiempoOPeracionReal: item.tiempoOPeracionReal,
        tiempoParoTrabajosPlan: item.tiempoParoTrabajosPlan,
        tiempoParoMant: item.tiempoParoMant,
        tiempoOperacionRequerido: item.tiempoOperacionRequerido,
        tiempoRequeridoAccProgramadas: item.tiempoRequeridoAccProgramadas,
        costoTotalMant: item.costoTotalMant,
        facturacion: item.facturacion,
        tiempoRealParoFalla: item.tiempoRealParoFalla,
      }));
      setData(transformedData);
      setReportes(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        if (checkAuth()) {
          setAuthenticated(true);
          if (checkAdmin()) {
            setAdministrator(true);
          }
        }
        else {
          navigate('/login')
        }

    
    } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  if (!authenticated) {
    return <div>Loading...</div>;//TODO: modify this component so it looks better
  }

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "Equipo", width: 90 },
    {
        field: "fechaId",
        headerName: "Fecha",
        width: 200
    },
    {
        field: "tiempoRealParoFalla",
        headerName: "trpf",
        width: 200
    },
    {
        field: "tiempoRealMant",
        headerName: "trm",
        width: 200
    },
    {
        field: "tiempoOPeracionReal",
        headerName: "tor",
        width: 200
    },
    {
        field: "tiempoParoTrabajosPlan",
        headerName: "tptp",
        width: 200
    },
    {
        field: "tiempoParoMant",
        headerName: "ttpm",
        width: 200
    },
    {
        field: "tiempoOperacionRequerido",
        headerName: "tor",
        width: 200
    },
    {
        field: "tiempoRequeridoAccProgramadas",
        headerName: "trap",
        width: 200
    },
    {
        field: "costoTotalMant",
        headerName: "ctm",
        width: 200
    },
    {
        field: "facturacion",
        headerName: "fact",
        width: 200
    },
    {
        field: "costoMantContratado",
        headerName: "cmc",
        width: 200
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/herramientas/" + params.row.id}>
              <button className="herramientasEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="herramientasDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
   
    <div className="herramientas">
        <form className="newReporteForm" onSubmit={filtrarLista}>
        <div className="newReporteItem">
        <label>Equipo</label>
        <select placeholder="Selecciona un equipo" value={equipoId} onChange={(e) => setEquipoId(e.target.value)}>
            {Equipos.map((equipo) => (
            <option key={equipo.equipoId} value={equipo.equipoId}>
                {equipo.equipoId}
            </option>
            ))}
        </select>
        
        <label>Día</label>
        <select placeholder="Selecciona un día" value={fechaSeleccionada.dia} onChange={(e) => handleChange(e, 'dia')}>
            {dias.map((dia) => (
            <option key={dia} value={dia}>
                {dia}
            </option>
            ))}
        </select>
        
        <label>Mes</label>
        <select placeholder="Selecciona un mes" value={fechaSeleccionada.mes} onChange={(e) => handleChange(e, 'mes')}>
            {meses.map((mes) => (
            <option key={mes} value={mes}>
                {mes || 'Vacío'}
            </option>
            ))}
        </select>

        <label>Año</label>
        <select placeholder="Selecciona un año" value={fechaSeleccionada.ano} onChange={(e) => handleChange(e, 'ano')}>
            {anos.map((ano) => (
            <option key={ano} value={ano}>
                {ano || 'Vacío'}
            </option>
            ))}
        </select>
        </div>
        <button type="submit" className="tableAddButton" onClick={filtrarLista}>Filtrar</button>
      </form>

        

         
      <div className="tableTitleContainer">
        <h1 className="tableTitle">Reporte</h1>

      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}

export default Herramientas;
