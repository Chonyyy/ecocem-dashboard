import '../../css/page/mantenimiento/ordenTrabajo.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkAuth, checkAdmin } from '../../scripts/auth';
//Get Relation Id from backend
function OrdenTrabajo() {
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

        const response = await axios.get('/OrdenTrabajo'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
          id: item.ordenTrabajoId,
          equipoId: item.equipoId,
          brigadaId: item.brigadaId,
          trabajadorId: item.trabajadorId,
          fechaId: new Date(item.fechaId) // Ensure fechaId is a Date object
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

  const handleCreateTool = () => {

  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 200
    },
    {
      field: "equipoId",
      headerName: "equipoId",
      width: 200
    },
    {
      field: "brigadaId",
      headerName: "brigadaId",
      width: 200
    },
    {
      field: "trabajadorId",
      headerName: "trabajadorId",
      width: 200
    },
    {
      field: "fechaId",
      headerName: "fechaId",
      type: 'dateTime',
      width: 200,
      valueGetter: (params) => new Date(params.value)
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/ordenTrabajo/" + params.row.id}>
              <button className="ordenTrabajoEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="ordenTrabajoDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
    {
      field: "create-tool",
      headerName: "Utilizar Herramienta",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          <Link to={"/carga-create?sede=" + params.row.id + "&entidad=" + params.row.entidadCompradoraId + "&fecha=" + params.row.fechaId}>
            <button className="ventaEdit">Crear Carga</button>
          </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="ordenTrabajo">
      <div className="tableTitleContainer">
        <h1 className="tableTitle">Orden de Trabajo</h1>
        <Link to="/orden-trabajo-create">
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

export default OrdenTrabajo;
