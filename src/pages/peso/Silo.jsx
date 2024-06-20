import '../../css/page/mantenimiento/silo.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function Silo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5103/api/Silo'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
          id: item.siloId,
          tipoEId: item.tipoEId,
          sedeId: item.sedeId
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
    { field: "siloId", headerName: "ID", width: 90 },
    {
      field: "tipoEId",
      headerName: "Tipo de silo",
      width: 200
    },
    {
        field: "sedeId",
        headerName: "Sede del silo",
        width: 200
      },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/silo/" + params.row.id}>
              <button className="siloEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="siloDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="silo">
      <div className="tableTitleContainer">
        <h1 className="tableTitle">Silos</h1>
        <Link to="/silo-create">
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

export default Silo;
