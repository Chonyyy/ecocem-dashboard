import '../../css/page/peso/carga.css';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function Carga() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/Carga'); // Update with your .NET API endpoint
        // Transform the response data to fit the DataGrid format
        const transformedData = response.data.map(item => ({
          id: item.tipoCementoId,
          siloId: item.siloId,
          vehiculoId: item.vehiculoId,
          fechaId: item.fechaId,
          pesoBruto: item.pesoBruto,
          tara: item.tara,
          medidorId: item.medidorId,
          nivel: item.nivel,
          pesoM: item.pesoM,
          volumen: item.volumen,
          basculaId: item.basculaId,
          pesoB: item.pesoB
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
    { field: "id", headerName: "tipoCementoId", width: 90 },
    {
      field: "siloId",
      headerName: "ID del silo",
      width: 200
    },
    {
        field: "vehiculoId",
        headerName: "ID del vehiculo",
        width: 200
      },
      {
        field: "fechaId",
        headerName: "Fecha",
        width: 200
      },
      {
          field: "pesoBruto",
          headerName: "Peso Bruto",
          width: 200
        },
        {
          field: "tara",
          headerName: "Tara",
          width: 200
        },
        {
            field: "medidorId",
            headerName: "ID del medidor",
            width: 200
          },
          {
            field: "nivel",
            headerName: "Nivel",
            width: 200
          },
          {
              field: "pesoM",
              headerName: "PesoM",
              width: 200
            },
            {
              field: "volumen",
              headerName: "Volumen",
              width: 200
            },
            {
                field: "basculaId",
                headerName: "ID de la bascula",
                width: 200
              },
              {
                field: "pesoB",
                headerName: "pesoB",
                width: 200
              },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/carga/" + params.row.id}>
              <button className="cargaEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="cargaDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="carga">
      <div className="tableTitleContainer">
        <h1 className="tableTitle">Cargas</h1>
        <Link to="/carga-create">
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

export default Carga;
