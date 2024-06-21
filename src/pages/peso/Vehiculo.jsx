import '../../css/page/peso/vehiculo.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { checkAuth, checkAdmin } from '../../scripts/auth';
import { useNavigate } from 'react-router-dom';

function Vehiculo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/Vehiculo'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
          id: item.vehiculoId,
          noSerie: item.noSerie
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "vehiculoId", headerName: "ID", width: 90 },
    {
      field: "noSerie",
      headerName: "noSerie",
      width: 200
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/vehiculo/" + params.row.id}>
              <button className="vehiculoEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="vehiculoDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="vehiculo">
      <div className="tableTitleContainer">
        <h1 className="tableTitle">Vehiculos</h1>
        <Link to="/vehiculo-create">
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

export default Vehiculo;
