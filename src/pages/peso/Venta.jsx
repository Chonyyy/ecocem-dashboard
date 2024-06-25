import '../../css/page/peso/venta.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { checkAuth, checkAdmin } from '../../scripts/auth';
import { useNavigate } from 'react-router-dom';

function Venta() {
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

        const response = await axios.get('/Venta'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
          id: item.sedeId,
          entidadCompradoraId: item.entidadCompradoraId,
          fechaId: item.fechaId
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
    { field: "id", headerName: "sedeId", width: 90 },
    {
      field: "entidadCompradoraId",
      headerName: "Entidad Compradora",
      width: 200
    },
    {
      field: "fechaId",
      headerName: "Fecha",
      type: "Date",
      width: 200
      },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/venta/" + params.row.id}>
              <button className="ventaEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="ventaDelete"
              onClick={() => handleDelete(params.row.id)}
            />
            <Link to={"/carga-create?sede=" + params.row.id + "&entidad=" + params.row.entidadCompradoraId + "&fecha=" + params.row.fechaId}>
              <button className="ventaEdit">Crear Carga</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="venta">
      <div className="tableTitleContainer">
        <h1 className="tableTitle">Ventas</h1>
        <Link to="/venta-create">
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

export default Venta;
