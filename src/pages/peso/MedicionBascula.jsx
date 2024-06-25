import '../../css/page/peso/medicionBascula.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { checkAuth, checkAdmin } from '../../scripts/auth';
import { useNavigate } from 'react-router-dom';

function MedicionBascula() {
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

        const response = await axios.get('/MedicionBascula'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
          id: item.vehiculoId,
          basculaId: item.basculaId,
          fechaBId: item.fechaBId,
          pesoB: item.pesoB
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
    { field: "id", headerName: "Vehiculo", width: 200 },
    {
      field: "basculaId",
      headerName: "Bascula",
      width: 200
    },
    {
        field: "fechaBId",
        headerName: "Fecha",
        width: 200
      },
      {
        field: "pesoB",
        headerName: "Peso",
        width: 200
      },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/medicionBascula/" + params.row.id}>
              <button className="medicionBasculaEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="medicionBasculaDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="medicionBascula">
      <div className="tableTitleContainer">
        <h1 className="tableTitle">MedicionBascula</h1>
        <Link to="/medicion-bascula-create">
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

export default MedicionBascula;
