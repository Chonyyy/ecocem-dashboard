import '../../css/page/mantenimiento/roturaEquipo.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function RoturaEquipo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5103/api/Herramienta'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
            equipoId: item.equipoId,
            roturaId: item.roturaId,
            fechaId: item.fechaId
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
    { field: "equipoId", headerName: "ID", width: 90 },
    {
        field: "roturaId",
        headerName: "Rotura",
        width: 200
    },
    {
        field: "fechaId",
        headerName: "Fecha",
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
            <Link to={"/roturaEquipo/" + params.row.id}>
              <button className="roturaEquipoEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="roturaEquipoDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="roturaEquipo">
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

export default RoturaEquipo;
