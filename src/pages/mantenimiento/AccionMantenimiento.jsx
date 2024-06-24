import '../../css/page/mantenimiento/accionMantenimiento.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { checkAuth, checkAdmin } from '../../scripts/auth';
import { useNavigate } from 'react-router-dom';

function AccionMantenimiento() {
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
            console.log("Admin")
            setAdministrator(true);
          }
          else{
            console.log("NotAdmin")
          }
        }
        else {
          navigate('/login')
        }

        const response = await axios.get('/AccionMantenimiento'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
          id: item.amId,
          descripcion: item.descripcion
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
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "descripcion",
      headerName: "Descripción",
      width: 200
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/accionMantenimiento/" + params.row.id}>
              <button className="accionMantenimientoEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="accionMantenimientoDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="accionMantenimiento">
      <div className="tableTitleContainer">
        <h1 className="tableTitle">Acciones de Mantenimiento</h1>
        {/* Example: Bosses can create */}
        {administrator && (
        <Link to="/accion-mantenimiento-create">
          <button className="tableAddButton">Create</button>
        </Link>)}
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

export default AccionMantenimiento;
