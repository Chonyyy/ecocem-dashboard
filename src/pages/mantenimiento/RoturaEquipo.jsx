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
        const response = await axios.get('/RoturaEquipo'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
            id: item.equipoId,
            roturaId: item.roturaId,
            fechaId: item.fechaId
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
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "roturaId",
        headerName: "Rotura",
        width: 200
    },
    {
        field: "fechaId",
        headerName: "Fecha",
        type: 'Date',
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
      <div className="tableTitleContainer">
        <h1 className="tableTitle">Rotura de Equipo</h1>
        <Link to="/rotura-equipo-create">
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

export default RoturaEquipo;
