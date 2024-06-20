import '../../css/page/mantenimiento/ordenTrabajo.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkAuth, checkAdmin } from '../../scripts/auth';

function OrdenTrabajo() {
  const [data, setData] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [administrator, setAdministrator] = useState(false);//TODO: implement changes for admins
  const navigate = useNavigate();

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

        const response = await axios.get('/OrdenTrabajo'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
            equipoId: item.equipoId,
            brigadaId: item.brigadaId,
            trabajadorId: item.trabajadorId,
            fechaId: item.fechaId
          }));
          setData(transformedData);
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
    {   field: "equipoId", 
        headerName: "equipoId", 
        width: 200 },
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
        width: 200
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
        checkboxSelection
      />
    </div>
  );
}

export default OrdenTrabajo;
