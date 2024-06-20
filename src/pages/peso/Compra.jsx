import '../../css/page/mantenimiento/compra.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function Compra() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5103/api/Compra'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
          id: item.compraId,
          fabricaId: item.fabricaId,
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
    { field: "compraId", headerName: "ID", width: 90 },
    {
      field: "tipoEId",
      headerName: "Tipo de compra",
      width: 200
    },
    {
        field: "fabricaId",
        headerName: "Fabrica",
        width: 200
      },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/compra/" + params.row.id}>
              <button className="compraEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="compraDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="compra">
      <div className="tableTitleContainer">
        <h1 className="tableTitle">Compras</h1>
        <Link to="/compra-create">
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

export default Compra;
