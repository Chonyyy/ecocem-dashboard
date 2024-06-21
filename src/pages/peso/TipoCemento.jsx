import '../../css/page/peso/tipoCemento.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { checkAuth, checkAdmin } from '../../scripts/auth';
import { useNavigate } from 'react-router-dom';

function TipoCemento() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/TipoCemento'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
          id: item.tipoCementoId,
          nombreTipoCemento: item.nombreTipoCemento
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
    { field: "tipoCementoId", headerName: "ID", width: 90 },
    {
      field: "nombreTipoCemento",
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
            <Link to={"/tipoCemento/" + params.row.id}>
              <button className="tipoCementoEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="tipoCementoDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="tipoCemento">
      <div className="tableTitleContainer">
        <h1 className="tableTitle">TipoCementos</h1>
        <Link to="/tipo-cemento-create">
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

export default TipoCemento;
