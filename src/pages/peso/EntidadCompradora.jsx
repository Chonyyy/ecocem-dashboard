import '../../css/page/peso/entidadCompradora.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function EntidadCompradora() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/EntidadCompradora'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
          id: item.entidadCompradoraId,
          nombreEntidadCompradora: item.nombreEntidadCompradora
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
    { field: "entidadCompradoraId", headerName: "ID", width: 90 },
    {
      field: "nombreEntidadCompradora",
      headerName: "Nombre",
      width: 200
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/entidadCompradora/" + params.row.id}>
              <button className="entidadCompradoraEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="entidadCompradoraDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="entidadCompradora">
      <div className="tableTitleContainer">
        <h1 className="tableTitle">Entidad Compradora</h1>
        <Link to="/entidad-compradora-create">
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

export default EntidadCompradora;
