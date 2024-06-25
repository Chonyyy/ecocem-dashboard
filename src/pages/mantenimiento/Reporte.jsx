import '../../css/page/mantenimiento/reporte.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkAuth, checkAdmin } from '../../scripts/auth';

function Reporte() {
  const [data, setData] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [administrator, setAdministrator] = useState(false);//TODO: implement changes for admins
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (await checkAuth()) {
          setAuthenticated(true);
          if (await checkAdmin()) {
            setAdministrator(true);
          }
        }
        else {
          navigate('/login')
        }

        const response = await axios.get('/Reporte'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
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
          costoMantContratado: item.costoMantContratado,
          perdidaIndisponibilidad: item.perdidaIndisponibilidad
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!authenticated) {
    return <div>Loading...</div>;//TODO: modify this component so it looks better
  }

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "Equipo", width: 200 },
    {
      field: "fechaId",
      headerName: "Fecha",
      width: 200
    },
    {
        field: "tiempoRealParoFalla",
        headerName: "tiempoRealParoFalla",
        width: 200
      },
      {
        field: "tiempoRealMant",
        headerName: "tiempoRealMant",
        width: 200
      },
      {
          field: "tiempoOPeracionReal",
          headerName: "tiempoOPeracionReal",
          width: 200
        },
        {
            field: "tiempoParoTrabajosPlan",
            headerName: "tiempoParoTrabajosPlan",
            width: 200
          },
          {
              field: "tiempoParoMant",
              headerName: "tiempoParoMant",
              width: 200
            },
            {
                field: "tiempoOperacionRequerido",
                headerName: "tiempoOperacionRequerido",
                width: 200
              },
              {
                  field: "tiempoRequeridoAccProgramadas",
                  headerName: "tiempoRequeridoAccProgramadas",
                  width: 200
                },
                {
                    field: "costoTotalMant",
                    headerName: "costoTotalMant",
                    width: 200
                  },
                  {
                      field: "facturacion",
                      headerName: "facturacion",
                      width: 200
                    },
                    {
                        field: "costoMantContratado",
                        headerName: "costoMantContratado",
                        width: 200
                      },
                      {
                          field: "perdidaIndisponibilidad",
                          headerName: "perdidaIndisponibilidad",
                          width: 200
                        },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/reporte/" + params.row.id}>
              <button className="reporteEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="reporteDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="reporte">
      <div className="tableTitleContainer">
        <h1 className="tableTitle">Reportes</h1>
        <Link to="/reporte-create">
          <button className="tableAddButton">Create</button>
        </Link>
      </div>

      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        autoHeight
      />
    </div>
  );
}

export default Reporte;
