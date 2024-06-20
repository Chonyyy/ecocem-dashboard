import '../../css/page/mantenimiento/herramientas.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function Herramientas() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5103/api/Herramienta'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
            herramientaId: item.herramientaId,
            nombre: item.nombre,
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
    { field: "herramientaId", headerName: "ID", width: 90 },
    {
        field: "nombre",
        headerName: "Nombre",
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
            <Link to={"/herramientas/" + params.row.id}>
              <button className="herramientasEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="herramientasDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="herramientas">
      <div className="tableTitleContainer">
        <h1 className="tableTitle">Herramientas</h1>
        <Link to="/herramientas-create">
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

export default Herramientas;
