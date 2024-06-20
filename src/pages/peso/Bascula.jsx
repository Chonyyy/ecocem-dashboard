import '../../css/page/peso/bascula.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function Bascula() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/Bascula'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
          id: item.basculaId,
          noSerie: item.noSerie,
          noSede: item.noSede,
          descripcion: item.descripcion
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
      field: "noSerie",
      headerName: "Numero de serie",
      width: 200
    },
    {
        field: "noSede",
        headerName: "Sede del bascula",
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
            <Link to={"/bascula/" + params.row.id}>
              <button className="basculaEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="basculaDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="bascula">
      <div className="tableTitleContainer">
        <h1 className="tableTitle">Basculas</h1>
        <Link to="/bascula-create">
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

export default Bascula;
