import '../../css/page/peso/medicionSilo.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { checkAuth, checkAdmin } from '../../scripts/auth';
import { useNavigate } from 'react-router-dom';

function MedicionSilo() {
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

        const response = await axios.get('/MedicionSilo'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
          id: item.siloId,
          medidorId: item.medidorId,
          fechaMId: item.fechaMId,
          nivel: item.nivel,
          pesoM: item.pesoM,
          volumen: item.volumen
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
    { field: "id", headerName: "Silo", width: 200 },
    {
      field: "medidorId",
      headerName: "Medidor",
      width: 200
    },
    {
        field: "fechaMId",
        headerName: "Fecha",
        width: 200
      },
      {
        field: "ivel",
        headerName: "Nivel",
        width: 200
      },
      {
        field: "pesoM",
        headerName: "Peso",
        width: 200
      },
      {
        field: "volumen",
        headerName: "Volumen",
        width: 200
      },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/medicionSilo/" + params.row.id}>
              <button className="medicionSiloEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="medicionSiloDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="medicionSilo">
      <div className="tableTitleContainer">
        <h1 className="tableTitle">MedicionSilo</h1>
        <Link to="/medicion-silo-create">
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

export default MedicionSilo;
