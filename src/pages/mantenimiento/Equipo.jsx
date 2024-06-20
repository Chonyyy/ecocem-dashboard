import '../../css/page/mantenimiento/equipo.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { checkAuth, checkAdmin } from '../../scripts/auth';

function Equipo() {
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

        const response = await axios.get('/Equipo'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
          id: item.equipoId,
          tipoEId: item.tipoEId,
          sedeId: item.sedeId
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
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "tipoEId",
      headerName: "Tipo de equipo",
      width: 200
    },
    {
        field: "sedeId",
        headerName: "Sede del equipo",
        width: 200
      },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/equipo/" + params.row.id}>
              <button className="equipoEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="equipoDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="equipo">
      <div className="tableTitleContainer">
        <h1 className="tableTitle">Equipos</h1>
        <Link to="/equipo-create">
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

export default Equipo;
