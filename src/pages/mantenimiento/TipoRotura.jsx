import '../../css/page/mantenimiento/tipoRotura.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function TipoRotura() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5103/api/Herramienta'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
            roturaId: item.roturaId,
            nombreRotura: item.nombreRotura,
            descripcion: item.descripcion
          }));
    
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
    { field: "roturaId", headerName: "ID", width: 90 },
    {
        field: "nombreRotura",
        headerName: "Nombre de la rotura",
        width: 200
    },
    {
        field: "descripcion",
        headerName: "Descripcion",
        width: 200
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/tipoRotura/" + params.row.id}>
              <button className="tipoRoturaEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="tipoRoturaDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="tipoRotura">
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

export default TipoRotura;
